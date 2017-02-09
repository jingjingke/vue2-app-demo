<template>
	<div class="container">
		<topComponent title='更多详情'>
			<span class="save" @click="$router.push('/user/repayRecord')" slot='right'>还款记录</span>
		</topComponent>
		<div class="borrowInfoDetail">
			<template v-if='data.repayType === 1'>
			    <p>项目编号<span>{{data.orderNo}}</span></p>
		    	<p>申请金额(元)<i class='queryIcon' @click='alertKnow("sqje")'>?</i><span>{{data.applyAmount}}</span></p>
		    	<p>借款期限(天)<span>{{data.borrowLimit}}</span></p>
		    	<p>放款时间<span>{{data.loanTime?data.loanTime:'待定'}}</span></p>
		    	<p>收款银行卡<i class='queryIcon' @click='alertKnow("skyhk")'>?</i><span>{{data.bankCard | filterBankId}}</span></p>
		    	<p>逾期违约金(元)<span>{{data.breachAmount?data.breachAmount:0}}</span></p>
		    	<p>已归还金额(元)<span>{{data.refundAmount?data.refundAmount:0}}</span></p>
		    	<p>未归还金额(元)<span>{{data.leftAmount?data.leftAmount:0}}</span></p>
		    	<p>可用保证金(元)<i class='queryIcon' @click='alertKnow("kybzj")'>?</i><span>{{availableMargin}}</span></p>
	    	</template>
	    	<template v-else>
	    		<p>申请金额(元)<i class='queryIcon' @click='alertKnow("sqje")'>?</i><span>{{data.applyAmount}}</span></p>
		    	<p>借款期限(月)<span>{{data.borrowLimit}}</span></p>
		    	<p>借款年利率(%)<span>{{data.rate}}</span></p>
		    	<p>收款银行卡<i class='queryIcon' @click='alertKnow("skyhk")'>?</i><span>{{data.bankCard | filterBankId}}</span></p>
		    	<p>放款时间<span>{{data.loanTime?data.loanTime:'待定'}}</span></p>
		    	<p>剩余期数(月)<span>{{data.borrowLimit}}</span></p>
		    	<p>项目编号<span>{{data.orderNo}}</span></p>
		    	<p>可用保证金(元)<i class='queryIcon' @click='alertKnow("kybzj")'>?</i><span>{{availableMargin}}</span></p>
	    	</template>	
	    </div>
    	<alertKnow v-if='knowShow' :title='knowTit' :content='knowCon' @goHide='knowShow = !knowShow'></alertKnow>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	        	data:{},
	        	knowShow:false,
	        }
	    },
	    filters:{
	    	filterBankId:function(val){
	    	//计算银行卡号，显示4-4-4-4-2排列的方式
	    		if(val == undefined) return '暂无';
	    		else{
	    			var str01 = val.substring(0,4),
	    				str02 = val.substring(4,8),
	    				str03 = val.substring(8,12),
	    				str04 = val.substring(12,16),
	    				str05 = val.substring(16,18);
	    			return  str01+' '+str02+' '+str03+' '+str04+' '+str05;
	    		}
	    	}
	    },
	    computed:{
	    	availableMargin:function(){
	    		if(this.data.rcvedDepositAmt === undefined || this.data.usedDepositAmt === undefined){
	    			return 0;
	    		}else{
	    			return this.data.rcvedDepositAmt - this.data.usedDepositAmt;
	    		}
	    	}
	    },
	    methods:{
	    	sendAjax(){
	        	//获取传递过来的id[只在无缓存的情况下使用]
	        	this.id = this.$route.params.id;
	        	//发送ajax
		    	this.$ajax('order/detail4web.json',{
		    		'appId':this.appInfo.appId,
					'orderId':String(this.id)
		    	},(rs)=>{
		    		//如果数据获取成功则拉取数据，将等待图关闭，并缓存数据(用于更多)
		    		this.data = rs.data;
					this.showDelay = false;
		    	})
		    	//ajax完成
	        },
	        getData(){
	        	//检查浏览器是否支持缓存,再决定从哪获取数据
	        	if(!!window.localStorage){
	        		this.data = JSON.parse(localStorage.getItem('borrowDetail'+this.$route.params.id));
	        	}else{
	        		this.sendAjax();
	        	}
	        }
	    },
	    mounted:function(){
	    	//数据提取[从缓存中]
	    	this.getData();
	    },
	    activated:function(){
	    	//判断被缓存的参数id与当前接收的参数id是否一致
	    	if(this.id !== this.$route.params.id)	this.getData();
	    }
	}
</script>