<template>
	<div class="container">
		<topComponent title='我的还款'>
			<span class="save" @click="$router.push('/user/repayRecord')" slot="right">还款记录</span>
		</topComponent>
		<template v-if='hasRecord' v-for='data in datas'>
			<div class="repayList">
				<p class="tit"><b class="fz28">还款日 {{data.planTime}}</b><em class="fr fz26 col6">{{data.periods}}期</em></p>
				<p class="tit"><em class="fz26 col6">已还款 {{data.hasRepay}}</em><b class="fr fz28">{{data.status | filterStatu}}</b></p>
				<p class="pt20">应还本金<span>{{data.principal}}</span></p>
				<p>应还利息<span>{{data.interest}}</span></p>
				<p>管理费<span>{{data.manageAmount}}</span></p>
				<p>逾期费用<span>{{data.breachAmount}}</span></p>
				<p>已还款<span>{{data.hasRepay}}</span></p>
				<p class="fz26 pt20 all">应还总额<span>{{data.totalAmount}}</span></p>
			</div>
			<span class="subBtn noRadius" @click="$router.push('/user/repaySure/'+data.orderId+'/'+data.id+'/'+data.totalAmount)">还款</span>
		</template>
		<pageError v-if='noRecord' :msg='recordTit' :class='recordCls'></pageError>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	            hasRecord:false,			//开关-记录列表是否显示[默认有]
	            noRecord:false,				//开关-无记录
	            recordTit:'暂无还款项目',		//无记录时显示文字
	            recordCls:'error-record',	//无记录时组件样式
	            datas:[],					//实际数据
	            temp:[],					//暂存数据
	            paramId:0,					//通过路由获取到的订单Id
	            showDelay:true,				//开关--显示等待转圈
	        	appId:'',					//记录appId
	        }
	    },
	    filters:{
	    	filterStatu:function(val){
	    		//根据状态数字返回相应文字
	    		if(val === 0) return "待归还";
	    		else if(val === 2) return "部分归还";
	    		else if(val === 3) return "已逾期";
	    	}
	    },
	    methods:{
	    	//默认(第一步)先获取所有待还的订单
	    	sendAjax:function(){
				//发送ajax
				this.$ajax('order/list.json',{
					'appId':this.appInfo.appId,
					'page_size':'12',
					'statusType':'3'
				},(rs)=>{
					//如果待还订单totalSize字段不存在(表示没有待还订单)
					if(rs.totalSize === undefined){
						//显示无记录
						this.noRecord = true;
					}else{
						//关闭转圈并显示列表
						this.showDelay = false;
						this.hasRecord = true;
						for(var i =0; i < rs.data.length; i++){
							this.sendIdAjax(rs.data[i].id);
						}
						//执行完for后，将第二步中temp接收到的数据根据时间排序后给datas
						this.datas=this.jsonSort(this.temp,'planTime');
						this.$store.commit('uploadRepay',{flag:false,data:this.datas});
					}
				})
				//ajax完成
	   		 },
	    	//第二步:向下面传递上面的待还订单Id获取它下面的分期的订单
	    	sendIdAjax:function(id){
	    		//发送ajax
	    		this.$ajax('order/repay_list.json',{
	    			'appId':this.appInfo.appId,
	    			'orderId':String(id)
	    		},(rs)=>{
	    			//关闭转圈并显示列表
					this.showDelay = false;
					this.hasRecord = true;
	    			//循环该订单下分期的若干订单
	    			for(var i =0; i < rs.data.length; i++){
						//先用temp接收数据[只接收第一个不是 已归还(status:1) 的订单数据]
						if(rs.data[i].status !== 1){
							//如果有传参的话则先将数据放到temp临时记录。否则直接赋值给data
							if(this.paramId === undefined){
								this.temp.push(rs.data[i]);
							}else{
								this.datas.push(rs.data[i]);
								this.$store.commit('addRepay',{id:this.id,val:this.datas});
							}
							break;
						}
					}
	    		})
	    		//ajax完成
	    	},
	    	pageLogic(){
	    		//这个页面即可以接受一个id参数（从借款过来时），也可以不接受参数（列表汇总页面）
				//（1）当接受不到id参数时，则去查所有待还的订单ID后查相应的分期待还（结果若干）
				//（2）否则当接受到参数，则忽略查所有待还订单，直接查最近的一期分期待还（结果只一个）
				this.showDelay = true;
	    		this.hasRecord = false;
				this.noRecord = false;
				this.datas = [];
				this.temp = [];
				this.appId = this.appInfo.appId;
				this.paramId = this.$route.params.id;
	    		if(this.paramId === undefined){
	    			this.sendAjax();
	    		}else{
	    			this.sendIdAjax(this.paramId);
	    		}
	    	}
	    },
	    activated:function(){
	    	//当页面未收到参数时
	    	if(this.$route.params.id === undefined){
	    		//获取store中状态以及保存的json(全部还款列表)
	    		var repayListStatus = this.$store.state.userPages.repayList,
	    			storeRepayList = this.$store.state.repayList;
	    		//判断缓存appId与当前全局appId是否一致或者vuex状态提示需要更新或者vuex记录没有值（最后一项表示的其实是刚进入页面时）
	    		if(this.appId !== this.appInfo.appId || repayListStatus === true || storeRepayList === ''){
	    			this.pageLogic();
	    		}else if(storeRepayList !== ''){
	    			this.datas = storeRepayList;
	    		}
	    	}else{
	    		//获取store中保存的json(指定id的还款列表)
	    		var repayGroupData = this.$store.state.borrowDetail[ this.$route.params.id ];
	    		//判断缓存参数与当前接受参数是否一致
	    		if(this.paramId !== this.$route.params.id || repayGroupData === undefined){
	    			this.pageLogic();
	    		}else if(repayGroupData !== undefined){
	    			this.data = repayGroupData;
	    		}
	    	}
	    }
	}
</script>