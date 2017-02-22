##src目录结构

```pre

├── assets                        // 静态资源(css,font,img,js)
│   ├── css                       // 存放静态css样式
│   │   └──省略
│   │
│   ├── font                      // 存放字体文件
│   │   └──省略
│   │
│   ├── img                       // 存放图片
│   │   └──省略
│   │
│   └── lib                       // js文件
│       ├── canvasCode.js         // canvas仿图片验证码       
│       ├── charfirst.js          // 城市按首字母排序
│       ├── pageFrom.js           // 页面来源
│       └── zhima.js              // 芝麻分
│
├── components                    // vue组件
│   ├── borrow                    // 子组件-应用于个人中心/我的借款 
│   │   ├── list.vue              // li使用的组件
│   │   └── title.vue             // tab头切换
│   │
│   ├── common                    // 通用组件
│   │   ├── list.vue              // li通用组件
│   │   ├── noMore.vue            // 没有更多
│   │   ├── pageError.vue         // 页面错误
│   │   └── top.vue               // 头部
│   │
│   ├── popup                     // 通过弹层组件
│   │   ├── alertKnow.vue         // 提示框-弹知识
│   │   ├── delay.vue             // 等待图-圆转圈
│   │   └── dialog.vue            // diglog错误/正功提示
│   │
│   ├── reward                    // 组件-应用于个人中心/我的奖励
│   │   ├── list.vue              // li使用的组件
│   │   └── title.vue             // tab头切换
│   │
│   ├── home.vue                  // 根组件
│   └── index.js                  // 组件引用注册（main.js引用-注册全局）
│
├── config                        // Vue配置函数等
│   ├── ajax.js                   // vue-resource post方法重装封装
│   ├── filters.js                // 过滤器
│   ├── methods.js                // 方法
│   ├── routes.js                 // 路由配置
│   └── secret.js                 // 加密方法封装
│
├── data                          // 数据文件(json)
│   ├── alertKnow.json            // 借款详情弹出(知识点)提示
│   ├── bankId.json               // 银行Id对应样式式和名称
│   └── helpDatas.json            // 帮助中心标题内容
│
├── store                         // vuex相关
│   └── index.js                  // vuex设置
│
├── views                         // 业务页面
│   ├── other                     // 其它
│   │   ├── error.vue             // 404
│   │   ├── expired.vue           // 登录过期提示 
│   │   └── login.vue             // 登录 
│   │
│   └── user                      // 个人中心
│       ├── borrow                // 我的借款模块
│       │   └──省略
│       │
│       ├── deal                  // 借款合同模块
│       │   └──省略
│       │
│       ├── help                  // 帮助中心模块
│       │   └──省略
│       │
│       ├── repay                 // 我的还款模块
│       │   └──省略
│       │
│       ├── reward                // 我的奖励模块
│       │   └──省略
│       │
│       ├── aboutUs.vue           // 关于我们
│       ├── feedback.vue          // 意见反馈
│       └── index.vue             // user首页
│
├── main.js                       // 项目入口文件

```
