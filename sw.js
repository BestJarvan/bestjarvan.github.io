if(!self.define){let e,i={};const d=(d,a)=>(d=new URL(d+".js",a).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(a,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let r={};const s=e=>d(e,n),b={module:{uri:n},exports:r,require:s};i[n]=Promise.all(a.map((e=>b[e]||s(e)))).then((e=>(c(...e),r)))}}define(["./workbox-3cc4ea75"],(function(e){"use strict";self.skipWaiting(),e.precacheAndRoute([{url:"2017/07/25/ionic2/ionic2+cordova/index.html",revision:"99d678d5489d62bc71274d8aec3a21e8"},{url:"2017/07/25/js/虚拟主机个人网站发布/index.html",revision:"9aa044eb6015cbf544e0b7a3e1202b22"},{url:"2017/07/25/node/node.js-login/index.html",revision:"b449dfbe3930b724acb1a8fa0f1e3524"},{url:"2017/08/08/ionic2/ionic2-jpush-iOS/index.html",revision:"beb9a34749ae79093f0bf967a0a88a7f"},{url:"2018/03/24/wechat/wx-A-Z/index.html",revision:"3955de3170fa626920991a507a22ae3e"},{url:"2018/03/24/wechat/wx-city-picker/index.html",revision:"f304673c7736f5d3fe54e9c5031a575f"},{url:"2018/03/24/wechat/wx-iOS/index.html",revision:"db086bb505927bde86ae62ca9cf5cffa"},{url:"2018/06/08/wechat/wx-problem/index.html",revision:"4789357a23170df6bafbb5d4a5a85759"},{url:"2018/06/14/wechat/wx-star/index.html",revision:"d3da5ffdbe1db4e7858750824177e9f6"},{url:"2018/06/20/ionic2/ionic2-jq/index.html",revision:"e6337b933b8ca9dba3054169b611b194"},{url:"2019/08/10/vue/shell-vue/index.html",revision:"7db96200ea64067ae9463725b6f94c9a"},{url:"2019/12/15/npm/npm-publish/index.html",revision:"d61ccbb178dfba316c54668eb2136d0d"},{url:"2020/04/14/npm/Typescript+verdaccio/index.html",revision:"30d8d9b5c45485de16be9f2fca70bf4a"},{url:"2020/08/06/js/indexedDB/index.html",revision:"b866953ed2e2605530fe7e09881ffef0"},{url:"2020/08/07/js/event-loop/index.html",revision:"81f3c62881ed17741f6695819131725e"},{url:"2020/11/13/js/input超过10^20科学记数法的解决方案/index.html",revision:"c72e28c71fbce1e05782c0254df3c694"},{url:"2021/08/10/vue/memory/index.html",revision:"0082ab7525d5c49440e346aa6b71bf35"},{url:"2021/08/15/notes/xbb-utils/index.html",revision:"77d1787b833eb7148ac007943d2d33c3"},{url:"2021/10/15/notes/typec-line/index.html",revision:"23f1fc5edd1e2e46cde6b2530b5c0113"},{url:"2021/11/19/notes/macOS12-xcode13/index.html",revision:"7f11b1d4e9d78e7c7765c818948fc2c6"},{url:"2021/12/30/notes/JavaScript语言精粹/index.html",revision:"c464057692e769d086c93dbb1390a875"},{url:"2022/02/10/notes/mi-T500/index.html",revision:"7f53be93d590646659abf6935be48631"},{url:"2022/03/10/vue/new Vue()/index.html",revision:"11ca50753d65fb0f19adb6efbf4b5dd2"},{url:"2022/04/10/vue/vue-init/index.html",revision:"90308cfb8795cd38021cab60842abf89"},{url:"2022/05/23/wechat/wx-html/index.html",revision:"54b7a2a623e9ed881858c9ff5d163004"},{url:"2022/06/22/notes/代码可读性/index.html",revision:"3bc412f37c1a648f710b3517feebf39e"},{url:"2022/08/15/js/手写call、apply、bind与this指向问题/index.html",revision:"28c340d32d413d039a83110d34cb7d7c"},{url:"2022/12/25/vue/micro-frontends/index.html",revision:"ca75a01183d12ef2498bbd4243b5c0e5"},{url:"2023/08/28/node/node-jenkins/index.html",revision:"d15eb75bc833f2ded44891a1b61d3ecd"},{url:"2023/09/05/node/myself-cli/index.html",revision:"e96440161d1fca94c767be7c812407a9"},{url:"2023/09/19/node/puppeteer/index.html",revision:"09c9f531060fb2caa99cb7341074eb59"},{url:"2023/09/20/notes/xbox-one/index.html",revision:"6f1f80fe53d9954f7a9da1dbfa53c353"},{url:"2023/12/10/js/sse/index.html",revision:"59ad1f7bf5a0c3788aaccac2de0c7078"},{url:"about/index.html",revision:"520cb7957c557945de2703602bca42a0"},{url:"archives/2017/07/index.html",revision:"617804c6511344604f5a6c2e139bd004"},{url:"archives/2017/08/index.html",revision:"ceb61d714adacdd940de1bb4b130ea49"},{url:"archives/2017/index.html",revision:"99e1dc9ab37b207eecb4cc06985c3117"},{url:"archives/2018/03/index.html",revision:"bec63805fed7e9bfb93b8931484669e8"},{url:"archives/2018/06/index.html",revision:"afc640936b12974e42ee8b251a151c6c"},{url:"archives/2018/index.html",revision:"9f685706f3ad94fe29f905dc7d6e61f5"},{url:"archives/2019/08/index.html",revision:"f2691c263620824818cd8085a10881de"},{url:"archives/2019/12/index.html",revision:"2993202ae176a0adb0f763c0bd1f55b6"},{url:"archives/2019/index.html",revision:"0abc177b1403300ffa1a70fc0f40e732"},{url:"archives/2020/04/index.html",revision:"137f66a62ebfb4953978b644a0f1921d"},{url:"archives/2020/08/index.html",revision:"14664eb86551ff8548c221d4595f0cfb"},{url:"archives/2020/11/index.html",revision:"82e7d58e95514e8b204e71ce9c74828d"},{url:"archives/2020/index.html",revision:"3adb4217cc9c9bc98fa4d442c261892b"},{url:"archives/2021/08/index.html",revision:"df79016c7114b828e235939178b3d17f"},{url:"archives/2021/10/index.html",revision:"4d9d57b915dbc415cc39a7a5fc623eba"},{url:"archives/2021/11/index.html",revision:"3465fe698c6d432853d2d67e52369b9c"},{url:"archives/2021/12/index.html",revision:"b1bcd69b064b0b172bfb641eaf28f746"},{url:"archives/2021/index.html",revision:"21b0ad1db1f30d9a13c13a27e5065620"},{url:"archives/2022/02/index.html",revision:"70e0da2aab6297141e36ab0e92235781"},{url:"archives/2022/03/index.html",revision:"68ddec9b40cd25e10fc78f445e2985bd"},{url:"archives/2022/04/index.html",revision:"eb62191e0cb10d250dba650ac1f647de"},{url:"archives/2022/05/index.html",revision:"bccb97db6ca0b44667b2e3e3a8f2308c"},{url:"archives/2022/06/index.html",revision:"011f8b1c9adbc84ad19c1454b4dbd1fa"},{url:"archives/2022/08/index.html",revision:"6921b8be38737c97d786b7d6ce06e843"},{url:"archives/2022/12/index.html",revision:"52bbf61ce8f97eb71c75c79a19a53bd4"},{url:"archives/2022/index.html",revision:"563163415448ec5c7c75c3b04f6d409d"},{url:"archives/2023/08/index.html",revision:"adb9517b4a5d9957d5fbc07c2065af64"},{url:"archives/2023/09/index.html",revision:"3d186c233f3ca6cbe0b62be4426cd20b"},{url:"archives/2023/12/index.html",revision:"15137ef4a320844a58533be876260b60"},{url:"archives/2023/index.html",revision:"d66772884a27592d4064f249094a65b9"},{url:"archives/index.html",revision:"4b7469e2d288d038ed540f8088cd3f00"},{url:"archives/page/2/index.html",revision:"e63cdd240c47ccf9190c4486d61677c0"},{url:"archives/page/3/index.html",revision:"236aa484052c6d52b2d70f21987fc359"},{url:"archives/page/4/index.html",revision:"5b76ca5ea4f85edfd3c88baa5b11c85b"},{url:"categories/index.html",revision:"039fdb74fa52713534d464d26abf047f"},{url:"categories/ionic2/index.html",revision:"cf393f5c57e3c871c0af538f0fb31ccc"},{url:"categories/js/index.html",revision:"445af518cbda656917ad96723dfc9943"},{url:"categories/node/index.html",revision:"bd5d0690bc21e53bac498312098ab2f0"},{url:"categories/notes/index.html",revision:"47ecfbbcc337f681064200f74ea386d8"},{url:"categories/npm/index.html",revision:"4c46518026c90c11ee26e47f1f226190"},{url:"categories/vue/index.html",revision:"18d685747f22fc70596cc3fb0a89541b"},{url:"categories/wechat/index.html",revision:"223ccfbdc9c1d3f73ad423bf1aafcfa3"},{url:"css/index.css",revision:"da4e5602c8118e169472b7a435829931"},{url:"friend/index.html",revision:"95d18df6088305842898f28819325992"},{url:"index.html",revision:"3325b977f0d274c8e64fe5eb60496fce"},{url:"js/header.js",revision:"1f38556fb6b6f1071c636e9478c44d7c"},{url:"js/scroll.js",revision:"5c7b389ea1003645b2e2132379a6aa2c"},{url:"js/sidebar.js",revision:"80945c0975fc9cbe619b0f82ce5f31cf"},{url:"js/stun-boot.js",revision:"0bf548eda18a96d5ee7bb68bea9f330f"},{url:"js/utils.js",revision:"eb6809895b8f4ff06fa7e8beb3c8bea7"},{url:"live2dw/assets/dsr50_2101.model.json",revision:"23b776785210699815122a156da478a8"},{url:"live2dw/assets/physics.json",revision:"36175ab1141357fd7071c7848d3a0be3"},{url:"live2dw/assets/pose.json",revision:"0981d60620faf5683849f3b2fa322ebc"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"manifest.json",revision:"25ff931bb8ce1ce3509d3916c88d6e5a"},{url:"page/2/index.html",revision:"f26873295ae60a6ec2598bac6516f792"},{url:"page/3/index.html",revision:"de5b8372f8f2e9ae40a3e0b308573c0c"},{url:"page/4/index.html",revision:"df9383dd01ee15713f2765a02d6ca1c7"},{url:"search.json",revision:"788dcbdd9aca3f21a53d108414f57663"},{url:"tags/angular/index.html",revision:"3115bc9d9df32ba0faca17c001b19601"},{url:"tags/CLI/index.html",revision:"eb0abfc23247532fb5a4ab7f3a2203e3"},{url:"tags/cookie/index.html",revision:"cb7f15fdb9b9ab303e0c8db32ef88dbf"},{url:"tags/cordova/index.html",revision:"37af68722ccc1affca21952481540f45"},{url:"tags/DIY/index.html",revision:"2eae7f4597821720c9a48e7203674e8f"},{url:"tags/event-loop/index.html",revision:"7e8df7a993d1af50f622e28be8e921ea"},{url:"tags/git/index.html",revision:"909c4bb65842d2f0a043ffcc2d790835"},{url:"tags/html/index.html",revision:"2d50f9c5f3d30708fcf11219d17abe59"},{url:"tags/index.html",revision:"540ec81281d3b0ef53e2cbc2cff473c6"},{url:"tags/indexedDB/index.html",revision:"bc92aa5d33aed2dbbf81dc073db80ccd"},{url:"tags/input/index.html",revision:"aa2ec12774325819c20df3276e2fb925"},{url:"tags/ionic2/index.html",revision:"b37beceba93305fc3b86142f5661a445"},{url:"tags/javascript/index.html",revision:"f2237dd762bb47d485ad43d61f578929"},{url:"tags/jenkins/index.html",revision:"3d079884d2e90bc64244e2ebeae5dc75"},{url:"tags/jest/index.html",revision:"2cdf8d3cdf774f80e4b3f986fe5652ac"},{url:"tags/jpush/index.html",revision:"4c82480597bbf62e62f1375c6fed5c81"},{url:"tags/jquery/index.html",revision:"67e77a8c49b212167dab86a27ba90430"},{url:"tags/localStorage/index.html",revision:"d0640ee012148c5200935b7213fdaf6a"},{url:"tags/macOS/index.html",revision:"cf386601bd840a9bd1039273c6e71a5b"},{url:"tags/memory/index.html",revision:"07b7989e374b95bce3c73517eaadd7ad"},{url:"tags/micro-app/index.html",revision:"d24d758fd4f905b304eb0d5345b401bc"},{url:"tags/nodejs/index.html",revision:"1bb43f5b8ac86852256728dfc2bbaa51"},{url:"tags/npm/index.html",revision:"e8c00f19dc4aee089c57c3a9aba4c10a"},{url:"tags/nrm/index.html",revision:"a882818a247a87ed4cf7579d9607d7f6"},{url:"tags/pm2/index.html",revision:"e889d7bffbd4a65b5a5f656a17229d43"},{url:"tags/puppeteer/index.html",revision:"fb7862a7e94fb01d47d443a124e49b48"},{url:"tags/qiankun/index.html",revision:"e836135458a1df47e878fa00cbabb3ff"},{url:"tags/rollup/index.html",revision:"49d242338e8b2bfbcc2e8faa0bac66f7"},{url:"tags/sessionStorage/index.html",revision:"2be249f4176077f862bb1bbc5e91e6d1"},{url:"tags/shell/index.html",revision:"8d8d46d8fb3a558f577ae4adc176f681"},{url:"tags/Simulator/index.html",revision:"5ff4820defd743f4f6b9e36241472486"},{url:"tags/SSE/index.html",revision:"e6c5fbb7896ffdce338b12c1dcc5bf25"},{url:"tags/typedoc/index.html",revision:"c60f5dcb5fb5f04b44a149ebde6850a7"},{url:"tags/typescript/index.html",revision:"fa3dcf8b9f272d2a966baac990f503a0"},{url:"tags/verdaccio/index.html",revision:"7b120d659a005da8b3a4eefe334c98d7"},{url:"tags/vue/index.html",revision:"db9d8e3ffd827a4f485f94195ab98046"},{url:"tags/vue2/index.html",revision:"af000e8ad4d034abe76f529762433be1"},{url:"tags/vue源码/index.html",revision:"fc218796f5be415c93f619f1c8cc0351"},{url:"tags/wechat/index.html",revision:"2628b6d1d09abe2592918b90ab7870e7"},{url:"tags/wujie/index.html",revision:"d6e95fc5c2a0891df2e9fa9bd2363399"},{url:"tags/xbox/index.html",revision:"27c01b4e5d051007b0eeed973ba8c45e"},{url:"tags/Xcode/index.html",revision:"62512e2d6f510d26fba274dda0e13879"},{url:"tags/微前端/index.html",revision:"f9127661d3fbb3b75d7b32a0106e09bd"}],{}),e.registerRoute("/",new e.NetworkFirst({cacheName:"index",plugins:[]}),"GET"),e.registerRoute(/\.(?:js|css)$/,new e.StaleWhileRevalidate({cacheName:"js-css",plugins:[]}),"GET"),e.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3})]}),"GET"),e.initialize({})}));
//# sourceMappingURL=sw.js.map
