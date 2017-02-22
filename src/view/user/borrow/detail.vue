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
	        	appId:''		//记录appId
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
	        	//记录当前缓存的appId用于后面区分
	    		this.appId = this.appInfo.appId;
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
					//vuex-store中存json数据
					this.$store.commit('addBorrow',{id:this.id,val:this.data});
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
	    activated:function(){
	    	//获取store中存的指定id的数据
	    	var storeData = this.$store.state.borrowDetail[this.$route.params.id];
	    	//若当前appId(keep-alive)与全局appId不一致 或者 store中未保存数据则需要更新数据
	    	if(this.appInfo.appId !== this.appId || storeData === undefined){
	    		this.showDelay = true;
	    		this.sendAjax();
	    	}else if(storeData !== undefined){
	    		//若store中存有数据
	    		this.data = storeData;
	    	}
	    }
	}
</script>