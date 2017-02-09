<template>
	<div class="container">
		<topComponent title='借款详情'>
			<span class="save" @click="$router.push('/user/repayRecord')" slot='right'>还款记录</span>
		</topComponent>
		<template v-if='!showDelay'>
			<div class="borrowInfoTit">
				<template v-if='data.repayType === 2'>
			    	<dl>
			    		<dt>还款方式<span class="col3">一次性还本付息</span></dt>
			    		<dd>项目状态<span class="blue">{{data.statusStr}}</span></dd>
			    	</dl>
			    	<ul>
			    		<li><b>{{data.interestAmount?data.interestAmount:'待定'}}</b>利息金额(元)</li>
			    		<li><b>{{nextRefundDate}}</b>还款日</li>
			    		<li><b>{{data.borrowAmount?data.borrowAmount:'待定'}}</b>授信金额(元)<i class='queryIcon' @click='alertKnow("sxje")'>?</i></li>
			    	</ul>
		    	</template>
		    	<template v-else>
		    		<dl>
			    		<dt>还款方式<span class="col3">等额本息</span></dt>
			    		<dd>项目状态<span class="blue">{{data.statusStr}}</span></dd>
			    	</dl>
			    	<ul>
			    		<li><b>{{nextAmountNeed}}</b>应还金额(元）</li>
			    		<li><b>{{nextRefundDate}}</b>下一个还款日</li>
			    		<li><b>{{data.borrowAmount?data.borrowAmount:'待定'}}</b>授信金额(元)<i class='queryIcon' @click='alertKnow("sxje")'>?</i></li>
			    	</ul>
		    	</template>
		    </div>
		    <ul class="listCom list-arrow list-mini no-top">
		    	<li @click='goMore'>更多详情</li>
		    </ul>	
			<ul class="listCom list-arrow list-mini no-top mt20" v-if='data.operates !="" '>
				<li @click='goReason' 	v-if="checkOperates(data.operates,'failReason')"	>查看理由</li>
				<li @click='goDeal' 	v-if="checkOperates(data.operates,'view_contact')"	>查看合同</li>
				<li @click='goRepay' 	v-if="checkOperates(data.operates,'repay')"			>还款</li>
				<!--<li>确认信息</li>-->
			</ul>
		</template>
		<alertKnow v-if='knowShow' :title='knowTit' :content='knowCon' @goHide='knowShow = !knowShow'></alertKnow>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	        	data:{},
	        	knowShow:false,
	        	showDelay:true,	//开关--显示等待转圈
	        	id:0,			//用于区分缓存Id
	        }
	    },
	    methods :{
	        goMore(){
	        	this.$router.push('/user/borrowDetail/'+ this.$route.params.id +'/more');
	        },
	        goReason(){
	        	this.$router.push('/user/borrowReason/'+ this.$route.params.id);
	        },
	        goDeal(){
	        	this.$router.push('/user/dealList');
	        },
	        goRepay(){
	        	this.$router.push('/user/repayList/'+this.$route.params.id);
	        },
	        checkOperates(str,val){
	        	//检查operates可提供的接下来的操作，如查看合同，还款等
	        	if(str.indexOf(val) > -1) return true;
	        	else return false;
	        },
	        sendAjax(){
	        	//获取传递过来的id
	        	this.id = this.$route.params.id;
	        	//发送ajax
		    	this.$ajax('order/detail4web.json',{
		    		'appId':this.appInfo.appId,
					'orderId':String(this.id)
		    	},(rs)=>{
		    		//如果数据获取成功则拉取数据，将等待图关闭，并缓存数据(用于更多)
		    		this.data = rs.data;
					this.showDelay = false;
					localStorage.setItem('borrowDetail'+this.id,JSON.stringify(this.data))
		    	})
		    	//ajax完成
	        }
	    },
	    computed:{
	    	//计算下一个还款日，根据返回的数据来
	    	nextRefundDate:function(){
	    		if( this.data.nextRefundDate == undefined){
	    			if( this.data.status == 107 || this.data.status == 207 ) return "无";
	    			else return "待定";
	    		}else{
	    			return this.data.nextRefundDate;
	    		}
	    	},
	    	//计算应还金额 还回值
	    	nextAmountNeed:function(){
	    		//如果返回的数据中，应还金额不存在--需要分情况
	    		if(this.data.nextAmountNeed === undefined){
	    			if(this.data.statusStr == '已还款')	return "无";
	    			else								return "待定";
	    		}else{
	    			return this.data.nextAmountNeed;
	    		}
	    	}
	    },
	    mounted:function(){
	    	//调用发送ajax
	    	this.sendAjax();
	    },
	    activated:function(){
	    	//判断被缓存的参数id与当前接收的参数id是否一致
	    	if(this.id !== this.$route.params.id){
	    		//获取localStorage数据
	    		var localData = localStorage.getItem('borrowDetail'+this.$route.params.id);
	    		//判断localStorage中是否有数据
	    		if(localData === null){
	    			this.showDelay = true;
	    			this.sendAjax();
	    		}else{
	    			this.data = JSON.parse(localData);
	    		}
	    	}
	    }
	}
</script>