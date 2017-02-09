<template>
	<div class="rewardWarp">
		<rewardTitle :idx='2'></rewardTitle>
		<rewardList v-if='hasReward' :items="list" class='reward-out'></rewardList>
		<pageError v-if='noReward' msg='暂无抵用券~' class='error-reward'></pageError>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				hasReward:false,	//开关-显示列表
				noReward:false,		//开关-无列表提示
				list:[],
				showDelay:true,		//开关--显示等待转圈
	        	appId:'',			//记录appId
			}
		},
		methods:{
			sendAjax(){
				this.appId = this.appInfo.appId;
				//发送ajax
				this.$ajax('user/voucher.json',{
					'appId':this.appInfo.appId,
					'status':'3'
				},(rs)=>{
					this.showDelay = false;
					//判断获取的数据条数是否为0
					if(rs.data.length === 0){
						this.noReward = true;
					}else{
						this.hasReward = true;
						this.list = rs.data;
					}
				})
				//ajax完成
			}
		},
	    mounted:function(){
	    	//发送ajax-获取奖励
	    	this.sendAjax();
	    },
	    activated:function(){
	    	if(this.appId !== this.appInfo.appId){
	    		//初始化数据
	    		this.hasReward = false;
	    		this.noReward = false;
	    		this.list = [];
	    		this.showDelay = true;
	    		//发送ajax
	    		this.sendAjax();
	    	}
	    }
	}
</script>