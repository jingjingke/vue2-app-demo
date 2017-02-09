import home from '../components/home';

export default [
	{
	    path:'/',	//根
	    component:home,
	    children:[
	        {
	            path:'',	//默认信用首页
	            redirect:'/login'
	        },
	        {
	            path:'/login',	//登录页面
	            component:resolve => require(['../view/other/login'], resolve)
	        },
	        {
	            path:'/expired',	//登录过期
	            component:resolve => require(['../view/other/expired'], resolve)
	        },
	        {
	            path:'user',	//个人中心系列页面
	            component:home,
	            children:[
	                {
	                    path:'',	//默认-个人中心
	                    component:resolve => require(['../view/user/index'], resolve)
	                },
	                {
	                    path:'borrowList',	//我的借款列表--4种状态
	                    component:resolve => require(['../view/user/borrow/list'], resolve),
	                    children:[
	                        {
	                            path:'',
	                            component:resolve => require(['../view/user/borrow/list-all'], resolve)
	                        },
	                        {
	                            path:'apply',
	                            component:resolve => require(['../view/user/borrow/list-apply'], resolve)
	                        },
	                        {
	                            path:'repay',
	                            component:resolve => require(['../view/user/borrow/list-repay'], resolve)
	                        },
	                        {
	                            path:'over',
	                            component:resolve => require(['../view/user/borrow/list-over'], resolve)
	                        },
	                        
	                    ]
	                },
	                {
	                    path:'borrowDetail/:id',	//我的借款-默认详情
	                    component:resolve => require(['../view/user/borrow/detail'], resolve)
	                },
	                {
	                    path:'borrowDetail/:id/more',	//我的借款-更多详情
	                    component:resolve => require(['../view/user/borrow/detail-more'], resolve)
	                },
	                {
	                    path:'borrowReason/:id',	//我的借款-不过理由
	                    component:resolve => require(['../view/user/borrow/reason'], resolve)
	                },
	                {
	                    path:'dealList',	//我的借款-合同列表
	                    component:resolve => require(['../view/user/deal/list'], resolve)
	                },
	                {
	                    path:'dealDetail',	//我的借款-合同详情
	                    component:resolve => require(['../view/user/deal/detail'], resolve)
	                },
	                {
	                    path:'repayList',	//我的还款列表--汇总
	                    component:resolve => require(['../view/user/repay/list'], resolve)
	                },
	                {
	                    path:'repayList/:id',	//我的还款列表--指定ID
	                    component:resolve => require(['../view/user/repay/list'], resolve)
	                },
	                {
	                    path:'repaySure/:order/:id/:total',	//我的还款--操作还款
	                    component:resolve => require(['../view/user/repay/sure'], resolve)
	                },
	                {
	                    path:'repayTip',	//我的还款--操作成功提示
	                    component:resolve => require(['../view/user/repay/tip'], resolve)
	                },
	                {
	                    path:'repayRecord',	//我的还款记录
	                    component:resolve => require(['../view/user/repay/record'], resolve)
	                },
	                {
	                    path:'rewardList',	//我的奖励列表--3种状态
	                    component:resolve => require(['../view/user/reward/list'], resolve),
	                    children:[
	                        {
	                            path:'',
	                            component:resolve => require(['../view/user/reward/unused'], resolve)
	                        },
	                        {
	                            path:'used',
	                            component:resolve => require(['../view/user/reward/used'], resolve)
	                        },
	                        {
	                            path:'expired',
	                            component:resolve => require(['../view/user/reward/expired'], resolve)
	                        }
	                    ]
	                },
	                {
	                    path:'helpList',	//帮助列表
	                    component:resolve => require(['../view/user/help/list'], resolve)
	                },
	                {
	                    path:'helpDetail/:index',	//帮助内容
	                    component:resolve => require(['../view/user/help/detail'], resolve)
	                },
	                {
	                    path:'feedback',	//意见反馈
	                    component:resolve => require(['../view/user/feedback'], resolve)
	                },
	                {
	                    path:'aboutUs',		//关于我们
	                    component:resolve => require(['../view/user/aboutUs'], resolve)
	                }
	            ]
	        }
	    ]
	},
	{
	    path:'*',	//404功能
	    component:resolve => require(['../view/other/error'], resolve)
	}
]