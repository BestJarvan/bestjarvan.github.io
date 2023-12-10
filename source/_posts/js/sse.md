---
title: Serve-Send-Events(SSE)项目中应用
date: 2023.12.10 16:03
categories: 
  - js
tags:
  - javascript
  - SSE

---

>最近收到一个需求，需要做一套消息中心，需求倒是很简单，再用户有新消息时推送给web页面，提示用户有新消息未读，最初版本用短轮询方案实现，若是局部组件，可关闭页面后结束轮询，但是此消息中心是一个全局组件，只要开启页面就开始轮询，体验不佳，看着network密密麻麻的请求头都大了，随使用SSE方案。

![短轮询](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/WX20231205-151930.png)

### 一、 对于这种消息推送目前几个成熟方案：

1. 客户端轮询 (短轮询)
2. 服务端轮询 (长轮询)
3. WebSocket
4. SSE (Serve-Send-Events)

### 二、各方案间区别：

|*|客户端轮询|服务端轮询|WebSocket|SSE|
|--|--|--|--|--|
|协议|http|http|tcp|http|
|优点|实现方便，兼容性好|同短轮询，但比短轮询节约资源，相对短轮询请求次数少|双全工通信协议，性能开销相对较小，可双向通信|H5规范的一部分，无需安装直接使用；资源占用小；前端部分实现极其简单|
|缺点|占用较多内存和请求数；污染network列表|同短轮询|开发成本高；相对sse资源开销大|单向推送；兼容性问题；只能get请求，且请求头无法加内容(或者使用第三方封装sse插件)|

### 三、SSE兼容问题：

![兼容浏览器](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20231210170510078.png)

### 四、SSE实现

#### 1. 前端实现

通用代码，不兼容浏览器降级处理

```javascript
// 如果断开链接15秒后重试，网络故障、接口故障等重连需要
const RETRY_TIME = 15 * 1000
// 生命周期中初始化此插件
initNotify() {
  if ('EventSource' in window) {
    // 第一次刷新消息数
    this.getUnReadNoticeCount()
    // 注册sse
    this.registerEvent()
  } else {
    // 不兼容走短轮询
    clearTimeout(this.timer)
    this.loopFetch()
  }
},
// 注册事件
registerEvent() {
  const now = new Date().getTime()
  if (!this.sourceTime || (now - this.sourceTime) >= RETRY_TIME) {
    this.sourceTime = new Date().getTime()
    const user = getUserInfo()
    const userId = user ? JSON.parse(user).userId : ''
    // notifyNumUrl = 'https://xxxx/message-center/sse/create?userId='+id;
    this.eventSource = new EventSource(notifyNumUrl(userId))
    console.log('eventSource: ', this.eventSource);
    // 链接成功回调
    this.eventSource.onopen = () => {
      clearTimeout(this.errorTimer)
    }
    // 持续接受消息
    this.eventSource.onmessage = ({ data }) => {
      if (data) {
        this.noticeNum = data
      }
    }
    // 失败回调
    this.eventSource.onerror = (error) => {
      if (error.currentTarget.readyState === 2) {
        this.eventSource.close && this.eventSource.close()
        this.registerEvent()
      }
    }
  } else {
    this.errorTimer = setTimeout(() => {
      this.registerEvent()
    }, RETRY_TIME)
  }
},
// 降级处理，递归轮询接口
loopFetch() {
  this.getUnReadNoticeCount()
  this.timer = setTimeout(() => {
    this.loopFetch()
  }, 1000 * 30)
},
// 请求处理
getUnReadNoticeCount() {
  // api请求
}
```



#### 2. 后端实现 JAVA Spring Web MVC

```java
@RestController
@RequestMapping("/sse")
@Api(tags = "Sse消息通知")
@Slf4j
public class SseController extends BaseController {
    @Resource
    private SseService sseService;

    /**
     * 创建新连接
     * @return
     */
    @GetMapping("/create")
    public Object createSession(String userId) throws IOException {
        return sseService.createSession(userId);
    }

    /**
     * 关闭连接
     * @return
     */
    @GetMapping("/close")
    public void closeSession(String userId) throws IOException {
        sseService.closeSession(userId);
    }
}

@DubboService
@Service
@Slf4j
public class SseServiceImpl implements SseService {

    public final static Map<String, SseEmitter> SSE_CACHE= new ConcurrentHashMap<>();

    public final static Map<String, Integer> SEND_RECORD= new ConcurrentHashMap<>();

    /**
     *  创建连接
     * @return
     */
    public synchronized SseEmitter createSession(String clientId) throws IOException{
        //需要手动清理（非正常关闭的情况下会一直保留原先的通道造成消息发送失败）
        SEND_RECORD.remove(clientId);
        // 过期时间设置为0，表示永不过期
        SseEmitter sseEmitter = new SseEmitter(0L);
        SSE_CACHE.put(clientId,sseEmitter);
        log.info("客户端：{}  新建连接成功，当前客户端总数为【{}】",clientId,SSE_CACHE.size() );
        return sseEmitter;
    }

    @Override
    public void closeSession(String clientId) {
        if (SSE_CACHE.containsKey(clientId)){
            SSE_CACHE.get(clientId).complete();
            SSE_CACHE.remove(clientId);
            SEND_RECORD.remove(clientId);
            log.info("客户端：【{}】 断开成功，当前剩余客户端总数为【{}】",clientId,SSE_CACHE.size());
        }
    }
}




@XxlJob("sendUnRead")
public void sendUnRead(){
    if (SseServiceImpl.SSE_CACHE.size()>0){
        List<UnReadNoticePO> unReadNoticePOS = noticeService.countAllUnReadNotice(new ArrayList<>(SseServiceImpl.SSE_CACHE.keySet()));
        log.info("stringIntegerMap",unReadNoticePOS);
        if(CollectionUtil.isNotEmpty(unReadNoticePOS)){

            for (Map.Entry<String, SseEmitter> entry : SseServiceImpl.SSE_CACHE.entrySet()) {
                String key = entry.getKey();
                Optional<UnReadNoticePO> first = unReadNoticePOS.stream().filter(u -> u.getUserId().equals(key)).findFirst();

                if(first.isPresent()){
                    log.info("first",first.get());
                    SseEmitter sseEmitter = SseServiceImpl.SSE_CACHE.get(key);
                    try {
                        Integer lastNum = SseServiceImpl.SEND_RECORD.get(first.get().getUserId());
                        if(ObjectUtil.isEmpty(lastNum) || lastNum!=first.get().getNum()){
                            sseEmitter.send(SseEmitter.event().reconnectTime(1000).id(entry.getKey()).data(first.get().getNum()));
                            log.info(entry.getKey()+"发送消息成功，内容：{}",first.get().getNum());
                        }
                        SseServiceImpl.SEND_RECORD.put(first.get().getUserId(),first.get().getNum());
                    }catch (IOException e){
                        //发送失败，移除
                        SseServiceImpl.SSE_CACHE.remove(entry.getKey());
                        log.error(entry.getKey()+"消息发送失败，通道已关闭!",e);

                    }
                }
            }
        }
    }
}
```

#### 3. 运维

运维需要配合修改`nginx`配置的`proxy-read-timeout`超时时间，目前我们方案超时时间一小时。



### 成品展示

此时只保留一条http请求，后端轮询到新消息就推送到前端，方便快捷，体验更好

![network](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/image-20231210173206861.png)
