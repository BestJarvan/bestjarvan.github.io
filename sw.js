if(!self.define){let e,i={};const d=(d,a)=>(d=new URL(d+".js",a).href,i[d]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=d,e.onload=i,document.head.appendChild(e)}else e=d,importScripts(d),i()})).then((()=>{let e=i[d];if(!e)throw new Error(`Module ${d} didn’t register its module`);return e})));self.define=(a,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let n={};const s=e=>d(e,r),f={module:{uri:r},exports:n,require:s};i[r]=Promise.all(a.map((e=>f[e]||s(e)))).then((e=>(c(...e),n)))}}define(["./workbox-3cc4ea75"],(function(e){"use strict";self.skipWaiting(),e.precacheAndRoute([{url:"2017/07/25/ionic2/ionic2+cordova/index.html",revision:"3107c2598a384240e449ef0099966ec4"},{url:"2017/07/25/js/虚拟主机个人网站发布/index.html",revision:"cf45236cf341fbd87bbe8d1c2af9f6c6"},{url:"2017/07/25/node/node.js-login/index.html",revision:"bf1df6fa4555d48c79b5daeafaa19e5d"},{url:"2017/08/08/ionic2/ionic2-jpush-iOS/index.html",revision:"1a4ca1945e3ea106a35018a563a4bc3b"},{url:"2018/03/24/wechat/wx-A-Z/index.html",revision:"845994edf277a1d79375d407e60ef703"},{url:"2018/03/24/wechat/wx-city-picker/index.html",revision:"fbb6c33a80ce07fbe982d7a0f9bbdef7"},{url:"2018/03/24/wechat/wx-iOS/index.html",revision:"f3f72b47743b70dd96d27bba705dad5f"},{url:"2018/06/08/wechat/wx-problem/index.html",revision:"76431630b1c872bc928b03360a4b4b44"},{url:"2018/06/14/wechat/wx-star/index.html",revision:"29706156f4f7cef2cff0c2d8e623bb9d"},{url:"2018/06/20/ionic2/ionic2-jq/index.html",revision:"33d666aee4f74feaebf1ab9a62ac9628"},{url:"2019/08/10/vue/shell-vue/index.html",revision:"ed148884f6d70a3b4990dcaec8d52e3f"},{url:"2019/12/15/npm/npm-publish/index.html",revision:"3122cf05e8b130e9b99ed88c803fc142"},{url:"2020/04/14/npm/Typescript+verdaccio/index.html",revision:"a0f13faf7a3f99082c8464d668c0eeba"},{url:"2020/08/06/js/indexedDB/index.html",revision:"c043855ab0db7d203d5ae0181f79260e"},{url:"2020/08/07/js/event-loop/index.html",revision:"d13ce578c15fda880fd4750a3aac3908"},{url:"2020/11/13/js/input超过10^20科学记数法的解决方案/index.html",revision:"cafe95fc9f0fae012e23eeec770a84ce"},{url:"2021/08/10/vue/memory/index.html",revision:"f582f15c87cc6a7e0d725e02715b5ed7"},{url:"2021/08/15/notes/xbb-utils/index.html",revision:"b4e5e6f82fe766725b6fc2306c2126bc"},{url:"2021/10/15/notes/typec-line/index.html",revision:"5f29e619720c8ccb7b7da7413a2aba91"},{url:"2021/11/19/notes/macOS12-xcode13/index.html",revision:"079282f60595c169d9df596e88ec76dc"},{url:"2021/12/30/notes/JavaScript语言精粹/index.html",revision:"1239a7fa2185923e73bf7e9c55699145"},{url:"2022/02/10/notes/mi-T500/index.html",revision:"0e95def6f1e2163c86e1a3eda80536a1"},{url:"2022/03/10/vue/new Vue()/index.html",revision:"45105ee8e2dd1c9b19db6a3b1e9ec487"},{url:"2022/04/10/vue/vue-init/index.html",revision:"9d0869d55f020dfbff96a8759d18655e"},{url:"2022/05/23/wechat/wx-html/index.html",revision:"5f25766930bea27483dcb892cbe53dd8"},{url:"2022/06/22/notes/代码可读性/index.html",revision:"a3ab233eac92714fc16efa5d286488e1"},{url:"2022/08/15/js/手写call、apply、bind与this指向问题/index.html",revision:"cfe6392fe7169fade691bbefcca58200"},{url:"2022/12/25/vue/micro-frontends/index.html",revision:"6497b98ea77cc34d8c8ea1c1c7bc7fcd"},{url:"2023/05/16/node/iterm2/index.html",revision:"4b886f2ac2d7549981b8cc642496aa9b"},{url:"2023/08/28/node/node-jenkins/index.html",revision:"0e0d7c0aa6cae387af7589efda58e1de"},{url:"2023/09/05/node/myself-cli/index.html",revision:"14be1d023f63f7f59c61ed3ee4a9659b"},{url:"2023/09/19/node/puppeteer/index.html",revision:"2e945da04a709fc36cbb09df23403e9f"},{url:"2023/09/20/notes/xbox-one/index.html",revision:"c56b08fe79cd87bb5097a33d064995f1"},{url:"2023/12/10/js/sse/index.html",revision:"04181f90c9d9ff8730a1d649746266c9"},{url:"2023/12/28/node/puppeteer-pdf/index.html",revision:"ef9ddd084106e5ef51347e73532b5109"},{url:"2024/02/26/js/monitor/index.html",revision:"d8c9a4e9667ed930043048bb20e67505"},{url:"2024/03/15/js/ResizeObserver/index.html",revision:"66fddc312f4e85c09defe2ffe22b1bb0"},{url:"2024/04/10/node/axios-img/index.html",revision:"84451f50c88d5f919732a7f5186a0b1f"},{url:"about/index.html",revision:"aba4ead92ccd702f7fc54791ebdfbe8d"},{url:"archives/2017/07/index.html",revision:"abe8148f55d3fb859acfd56dd5d29af6"},{url:"archives/2017/08/index.html",revision:"245e48749b1f83fd9ad09e79c386021d"},{url:"archives/2017/index.html",revision:"3b9eae97a95f2c5fc5e97565992616c7"},{url:"archives/2018/03/index.html",revision:"e1d640f0ab91a3edc9b4230dd4c33944"},{url:"archives/2018/06/index.html",revision:"5d014e535e9f09af48c2271c96dba6ce"},{url:"archives/2018/index.html",revision:"2a6f1586ff5848669cd407e218cf5129"},{url:"archives/2019/08/index.html",revision:"f23d98b38e08298bce78c390579e2b31"},{url:"archives/2019/12/index.html",revision:"5adb6bf0f7dbe3fc7b034d1956fab462"},{url:"archives/2019/index.html",revision:"3e94c18ec12e579b93de316a98178bf3"},{url:"archives/2020/04/index.html",revision:"7d6ddbdb6ee52aa0f547e4ec87eb8382"},{url:"archives/2020/08/index.html",revision:"9dc10458ec020a9d45211c4f040d35bf"},{url:"archives/2020/11/index.html",revision:"227748db078e4c8e56c77e6f0752756f"},{url:"archives/2020/index.html",revision:"7fcf5a261d68f9a58251ae8fdba805cb"},{url:"archives/2021/08/index.html",revision:"9d86e0fcc9238586929f749218d6f2b7"},{url:"archives/2021/10/index.html",revision:"664bd592a19455bf3df1e2eb40ccdc59"},{url:"archives/2021/11/index.html",revision:"1c6e79ef18b6612551b8d071fc8f4060"},{url:"archives/2021/12/index.html",revision:"e375c5aa192d089f30ce243c9097aeea"},{url:"archives/2021/index.html",revision:"49b52af9ace734b944d9fbf99054a039"},{url:"archives/2022/02/index.html",revision:"e91323ac4c7a09d66f3e6f1e768adafa"},{url:"archives/2022/03/index.html",revision:"a3c977cf03cc9d29738a3ca501dbc9e2"},{url:"archives/2022/04/index.html",revision:"3d4882ca08fd13fe807ec807e1658d16"},{url:"archives/2022/05/index.html",revision:"c58ce51b62bf43f80eb5be9530125ff1"},{url:"archives/2022/06/index.html",revision:"64edaaaf5d652633d1c5428d0f32794e"},{url:"archives/2022/08/index.html",revision:"9ddc76239a3f5fe7db2d656e304660d2"},{url:"archives/2022/12/index.html",revision:"b52f3200b949597e323268bf15dea793"},{url:"archives/2022/index.html",revision:"e086ad8bf5f8bb776d19a812a18bc3e2"},{url:"archives/2023/05/index.html",revision:"93aed03d79cf28d767ca9df1b85f87db"},{url:"archives/2023/08/index.html",revision:"da961203bce4c164d617a3bafff3211d"},{url:"archives/2023/09/index.html",revision:"ec698971931e331d64e63dd4f516fba0"},{url:"archives/2023/12/index.html",revision:"ccbc7c03162ca1b26819dfccce9abc57"},{url:"archives/2023/index.html",revision:"d0c17ef57f76d0b93495eeec161bda12"},{url:"archives/2024/02/index.html",revision:"169c54b93bc0749f769b274fa1d110ff"},{url:"archives/2024/03/index.html",revision:"1693a196758e48173518c4dcf3415000"},{url:"archives/2024/04/index.html",revision:"50b46f7efef6480322c9fba1b8c5fc8a"},{url:"archives/2024/index.html",revision:"74b5a7d358bef7a0b22b8d5933848a73"},{url:"archives/index.html",revision:"8661c6ee710476decc52dbef8088ee0b"},{url:"archives/page/2/index.html",revision:"1ae6914d37655a9b032f2d03ebd21823"},{url:"archives/page/3/index.html",revision:"21afbc770215f320208f9aa0ee64c8fe"},{url:"archives/page/4/index.html",revision:"fba6b63517c830dad5163288c8d4f355"},{url:"categories/index.html",revision:"e7adab78e9a32a77c92a4131dbae8cc4"},{url:"categories/ionic2/index.html",revision:"9294cb5b1f0fde5d31b0f3ace97bdf79"},{url:"categories/js/index.html",revision:"1d3f482539822d2ae508facae6e8317d"},{url:"categories/node/index.html",revision:"617d5692df4108bcdc5469ab0e930650"},{url:"categories/node/notes/index.html",revision:"22a0ba0b80ef7ba5c6e15952da6dfda8"},{url:"categories/notes/index.html",revision:"b078ebd384409744add0215ddb42df43"},{url:"categories/npm/index.html",revision:"868eaada225c7bb09d64bf6f03931ec4"},{url:"categories/vue/index.html",revision:"7e617dd1a924b592f8ae54e0710e1fc3"},{url:"categories/wechat/index.html",revision:"1b460bdac60f831bac8315232bf7a052"},{url:"css/index.css",revision:"1b02b2a620d30d884ff009c27c3fec7c"},{url:"friend/index.html",revision:"631a38ce174e67f2eb9dc74f63c2126f"},{url:"index.html",revision:"c66693241d0d27f1d9924764035534a6"},{url:"js/header.js",revision:"1f38556fb6b6f1071c636e9478c44d7c"},{url:"js/scroll.js",revision:"5c7b389ea1003645b2e2132379a6aa2c"},{url:"js/sidebar.js",revision:"80945c0975fc9cbe619b0f82ce5f31cf"},{url:"js/stun-boot.js",revision:"0bf548eda18a96d5ee7bb68bea9f330f"},{url:"js/utils.js",revision:"eb6809895b8f4ff06fa7e8beb3c8bea7"},{url:"live2dw/assets/dsr50_2101.model.json",revision:"23b776785210699815122a156da478a8"},{url:"live2dw/assets/physics.json",revision:"36175ab1141357fd7071c7848d3a0be3"},{url:"live2dw/assets/pose.json",revision:"0981d60620faf5683849f3b2fa322ebc"},{url:"live2dw/lib/L2Dwidget.0.min.js",revision:"32973883fcac0a9ae6cc79c0ea25fda2"},{url:"live2dw/lib/L2Dwidget.min.js",revision:"094cbace49a39548bed64abff5988b05"},{url:"manifest.json",revision:"25ff931bb8ce1ce3509d3916c88d6e5a"},{url:"page/2/index.html",revision:"3896acbe5ec73bcf8b8892c2cdabb7b7"},{url:"page/3/index.html",revision:"9c54bac53d84de8e131b78d53579aa14"},{url:"page/4/index.html",revision:"3e393cc8dd58f9243d4f8c2e4289143e"},{url:"search.json",revision:"3148ae872681fafefa951a15c920345d"},{url:"tags/angular/index.html",revision:"480cf5e6ea5dca377dec2012f30c8d65"},{url:"tags/api/index.html",revision:"22abc628e55bf8535f933cbcbb3f001e"},{url:"tags/axios/index.html",revision:"2dd733d4d309ee35beae1c971c286f56"},{url:"tags/CLI/index.html",revision:"cd6ccf01518ad25e8da9e5c905a181d7"},{url:"tags/cookie/index.html",revision:"ef5a52d505d7c1fc5a0df4ff34a398fb"},{url:"tags/cordova/index.html",revision:"c1fa42ac1aae913bd31ccbe6f694a87d"},{url:"tags/DIY/index.html",revision:"bc30ca6f8aa34c6a1571a7c10ca58142"},{url:"tags/event-loop/index.html",revision:"d3bd4e0ef10b61c1cea0883e6920bd24"},{url:"tags/git/index.html",revision:"abef49dd6d99ed079ae9c2448582e2c7"},{url:"tags/html/index.html",revision:"075e9cfc99139a422ef1c1cbd4c5daed"},{url:"tags/index.html",revision:"a13364375f34106894715dc5c66fb7c2"},{url:"tags/indexedDB/index.html",revision:"a5d95089f5e32a45ca5538d29c0a8bb4"},{url:"tags/input/index.html",revision:"d3d2e009042344aea9298d59ac9ad540"},{url:"tags/ionic2/index.html",revision:"a6f47fd87456ffcde0e269957da1244f"},{url:"tags/iTerm2/index.html",revision:"e6df585a95ba2db232890095c96fe662"},{url:"tags/javascript/index.html",revision:"29a68f63179c661173ee46ef07ae677c"},{url:"tags/javascript/page/2/index.html",revision:"73cf599cccf7e99e7b399b2160563096"},{url:"tags/jenkins/index.html",revision:"1197d79c3483a3e2e2657553bad3c74d"},{url:"tags/jest/index.html",revision:"add4e04fdf5da7307014a330886fab23"},{url:"tags/jpush/index.html",revision:"2331c064db893d1ed6a10e2ec1507aeb"},{url:"tags/jquery/index.html",revision:"6de4dc5133c158dbda37ca34c82e3540"},{url:"tags/localStorage/index.html",revision:"74a90441e490bb25902b9773d424c6a7"},{url:"tags/macOS/index.html",revision:"de96b8ef9f07c74ec65a3289aa3d1460"},{url:"tags/memory/index.html",revision:"5075d6c4a5c6f546d771c861eb18b532"},{url:"tags/micro-app/index.html",revision:"e9d1409f280f27f7a6aba7a91b6f5aa9"},{url:"tags/nodejs/index.html",revision:"07f830921444ac130c95efed4eceaf0a"},{url:"tags/npm/index.html",revision:"647e3aa4a53b64a45fc14dd3f61f0588"},{url:"tags/nrm/index.html",revision:"43751faf13c64c05a88543c06b67e1c6"},{url:"tags/pm2/index.html",revision:"30f3da3bfb4af3308d427897a567f932"},{url:"tags/puppeteer/index.html",revision:"015c0f59527cbf2d02d58defff553f1e"},{url:"tags/qiankun/index.html",revision:"193b96334e75cbfcecf41b5c037a663e"},{url:"tags/rollup/index.html",revision:"5992f482cc0aa9b646139b879bc2de07"},{url:"tags/sessionStorage/index.html",revision:"ae15c4a0fbe321fb6b14848b70f522ba"},{url:"tags/shell/index.html",revision:"8037b96d79ead30ac589b84a1937ecc0"},{url:"tags/Simulator/index.html",revision:"d20850f3ea0980ed468abe48cc79bba1"},{url:"tags/SSE/index.html",revision:"b8bb63281425c2ebeee757929f3ddfd2"},{url:"tags/typedoc/index.html",revision:"d8518b3e78e46d4c195a2e2196bc8795"},{url:"tags/typescript/index.html",revision:"b476738c6f8e21f207ea7edbf8fd4345"},{url:"tags/verdaccio/index.html",revision:"310d3f46091e8fe756fe76113f679fb7"},{url:"tags/vue/index.html",revision:"16b33e8561f12001079fe2bbb6f7b886"},{url:"tags/vue2/index.html",revision:"138f172c1fad367ac669d3ba60897ad6"},{url:"tags/vue源码/index.html",revision:"41c3712825d4728f3fb56186e4a904ad"},{url:"tags/webpack-plugin/index.html",revision:"20be5a757f87077c75370adb3ae5bd4c"},{url:"tags/wechat/index.html",revision:"a41a4a65bd1bde8b11407ddc696880ee"},{url:"tags/wujie/index.html",revision:"c22ea5f1e3809147a8ffd37e71072ee8"},{url:"tags/xbox/index.html",revision:"c0a56f0a42a4f5a816b7c911b9f9f3b2"},{url:"tags/Xcode/index.html",revision:"7372ff884507739321c68e0e142e69b9"},{url:"tags/微前端/index.html",revision:"e4563f4aaf5886a88e19cba74c0540f4"}],{}),e.registerRoute("/",new e.NetworkFirst({cacheName:"index",plugins:[]}),"GET"),e.registerRoute(/\.(?:js|css)$/,new e.StaleWhileRevalidate({cacheName:"js-css",plugins:[]}),"GET"),e.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"images",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.googleapis\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.CacheableResponsePlugin({statuses:[0,200]}),new e.ExpirationPlugin({maxAgeSeconds:31536e3})]}),"GET"),e.initialize({})}));
//# sourceMappingURL=sw.js.map
