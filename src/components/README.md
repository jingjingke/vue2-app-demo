##components目录结构

```pre

├── borrow                    // 子组件-应用于个人中心/我的借款 
│   ├── list.vue              // li使用的组件
│   └── title.vue             // tab头切换
│
├── common                    // 通用组件
│   ├── list.vue              // li通用组件
│   ├── noMore.vue            // 没有更多
│   ├── pageError.vue         // 页面错误
│   └── top.vue               // 头部
│
├── popup                     // 通过弹层组件
│   ├── alertKnow.vue         // 提示框-弹知识
│   ├── delay.vue             // 等待图-圆转圈
│   └── dialog.vue            // diglog错误/正功提示
│
├── reward                    // 组件-应用于个人中心/我的奖励
│   ├── list.vue              // li使用的组件
│   └── title.vue             // tab头切换
│
├── home.vue                  // 根组件
├── index.js                  // 组件引用注册（main.js引用-注册全局）

```
