# vue2-app-demo #
该项目与vuePro-demo练习项目相比大同小异，异的地方在于新增了axios，在真实发送ajax的同时带入数据加密crypto-js，因为有加入公钥、私钥和appId的角色，为了安全，在项目中取消了公钥字符串，所以项目开发和发布都没办法在git中真实体验。接下来也只做目录结构与业务流程的说明。

> 想要查看更多或者可移步至vuePro-demo项目，链接:[https://github.com/jingjingke/vuePro-demo](https://github.com/jingjingke/vuePro-demo)

该项目仅取vuePro-demo中的个人中心模板进行优化，大致效果参照【[点击链接](https://jingjingke.github.io/vuePro-demo/dist/index.html#/user/)】。并在此基础上，新增了keep-alive、列表下拉刷新更多、退出登录以及页面切换delay等待效果。

## 目录结构 ##
接下来只着重说明src文件夹的结构：

```pre

├── build                             // webpack打包配置
├── config                            // webpack环境配置
├── src                               // 生产目录(着重说明)
│   ├── assets                        // 静态资源(css,font,img,js)
│   │   ├── css                       // 存放静态css样式
│   │   │   └──省略
│   │   │
│   │   ├── font                      // 存放字体文件
│   │   │   └──省略
│   │   │
│   │   ├── img                       // 存放图片
│   │   │   └──省略
│   │   │
│   │   └── lib                       // js文件
│   │       ├── canvasCode.js         // canvas仿图片验证码       
│   │       ├── charfirst.js          // 城市按首字母排序
│   │       ├── pageFrom.js           // 页面来源
│   │       └── zhima.js              // 芝麻分
│   │
│   ├── components                    // vue组件
│   │   ├── borrow                    // 子组件-应用于个人中心/我的借款 
│   │   │   ├── list.vue              // li使用的组件
│   │   │   └── title.vue             // tab头切换
│   │   │
│   │   ├── common                    // 通用组件
│   │   │   ├── list.vue              // li通用组件
│   │   │   ├── noMore.vue            // 没有更多
│   │   │   ├── pageError.vue         // 页面错误
│   │   │   └── top.vue               // 头部
│   │   │
│   │   ├── popup                     // 通过弹层组件
│   │   │   ├── alertKnow.vue         // 提示框-弹知识
│   │   │   ├── delay.vue             // 等待图-圆转圈
│   │   │   └── dialog.vue            // diglog错误/正功提示
│   │   │
│   │   ├── reward                    // 组件-应用于个人中心/我的奖励
│   │   │   ├── list.vue              // li使用的组件
│   │   │   └── title.vue             // tab头切换
│   │   │
│   │   ├── home.vue                  // 根组件
│   │   └── index.js                  // 组件引用注册（main.js引用-注册全局）
│   │
│   ├── config                        // Vue配置函数等
│   │   ├── ajax.js                   // vue-resource post方法重装封装
│   │   ├── filters.js                // 过滤器
│   │   ├── methods.js                // 方法
│   │   ├── routes.js                 // 路由配置
│   │   └── secret.js                 // 加密方法封装
│   │
│   ├── data                          // 数据文件(json)
│   │   ├── alertKnow.json            // 借款详情弹出(知识点)提示
│   │   ├── bankId.json               // 银行Id对应样式式和名称
│   │   └── helpDatas.json            // 帮助中心标题内容
│   │
│   ├── views                         // 业务页面
│   │   ├── other                     // 其它
│   │   │   ├── error.vue             // 404
│   │   │   ├── expired.vue           // 登录过期提示 
│   │   │   └── login.vue             // 登录 
│   │   │
│   │   └── user                      // 个人中心
│   │       ├── borrow                // 我的借款模块
│   │       │   └──省略
│   │       │
│   │       ├── deal                  // 借款合同模块
│   │       │   └──省略
│   │       │
│   │       ├── help                  // 帮助中心模块
│   │       │   └──省略
│   │       │
│   │       ├── repay                 // 我的还款模块
│   │       │   └──省略
│   │       │
│   │       ├── reward                // 我的奖励模块
│   │       │   └──省略
│   │       │
│   │       ├── aboutUs.vue           // 关于我们
│   │       ├── feedback.vue          // 意见反馈
│   │       └── index.vue             // user首页
│   │
│   └── main.js                       // 项目入口文件
│
├── .babelrc                          // babel工具配置
├── .gitignore                        // git项目忽略上传的文件/文件夹配置
├── README.md                         // 说明文档
├── package.json                      // 项目配置信息

```

## 大致页面流程图 ##
![](http://www.jingjingke.com/uploads/allimg/170213/processon.png)
画的不好请勿拍~

## 页面部分截图 ##
![](http://www.jingjingke.com/uploads/allimg/170213/vue-pic1.gif)
![](http://www.jingjingke.com/uploads/allimg/170213/vue-pic2.gif)