---
title: 友链
---

#### 友链
{% friends _data/friends.json %}

#### 我的关注
{% friends _data/follow.json %}

#### 留言添加友链
如果你也想跟我交换友链的话, 请在评论中给我这样格式的数据:
```json
{
  "avatar": "https://jiangyh.cn/avatar.jpeg",
  "name": "your name",
  "introduction": "你的个人介绍",
  "url": "https://example.com/"
}
```

并在你的博客中加入我的链接, 数据如下:
```json
{
  "avatar": "https://jiangyh.cn/avatar.jpeg",
  "name": "Jiangyh",
  "introduction": "coding...",
  "url": "https://jiangyh.cn/"
}
```
THANKS~
