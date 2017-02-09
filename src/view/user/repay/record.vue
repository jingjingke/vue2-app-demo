<template>
	<div class="container">
		<topComponent title='还款记录'></topComponent>
		<ul class="repayRecord" v-if='hasRecord'>
			<li v-for="data in datas">
				<p><span class="money">{{data.repayAmount}}</span><span class="fr col6">{{data.periods}}期</span></p>
				<p>{{data.repayTime}}<span class="fr">{{data.orderNo}}</span></p>
			</li>
		</ul>
		<pageError v-if='noRecord' :class='recordCls'>
			<template slot='cont'>还没有任何还款记录哦<br><span class="link" @click="$router.push('/loan')">去申请借款吧</span></template>
		</pageError>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	        	hasRecord:false,
	        	noRecord:false,
	        	recordCls:'error-repay',
	        	datas:[],
	        	showDelay:true,		//开关--显示等待转圈
	        	appId:'',			//记录appId
	        }
	    },
	    methods:{
	    	sendAjax(){
	    		this.appId = this.appInfo.appId;
	    		//发送ajax
				this.$ajax('repay/repay_list.json',{
					'appId':this.appInfo.appId
				},(rs)=>{
					this.showDelay = false;
					//如果返回的数据结果条数等于0则表示无记录
					if(rs.data.length == 0){
						this.noRecord = true;
					}else{
						this.hasRecord = true;
						this.datas = this.jsonSort(rs.data,'repayTime');
					}
				})
				//ajax完成
	    	}
	    },
	    mounted:function(){
	    	//发送ajax--获取还款记录数据
			this.sendAjax();
	    },
	    activated:function(){
	    	if(this.appId !== this.appInfo.appId){
	    		//如果缓存Id与当前Id不一致则需要重新发送ajax
	    		this.showDelay = true;
	    		this.sendAjax();
	    	}
	    }
	}
</script>