<template>
	<div class="container">
		<topComponent title='还款'></topComponent>
		<div class="repayMent" v-if='!showDelay'>
			<ul class="formCom form-plus">
				<li>
					<label>本次还款<input type="text" :placeholder="total" readonly="readonly" /></label>
				</li>
			</ul>
			<ul class="formCom form-plus mt20">
				<li>
					<label>身份信息<input type="text" :value="personInfo" readonly="readonly" /></label>
				</li>
				<li>
					<label>银行信息<p class="input bank" :class='[bank[data.bankCardId].cls]' >{{bankInfo}}</p></label>
				</li>
			</ul>
			<div class="tip">
				<p>限额：单笔5.00万元，单日20.00万元，单月20.00万元</p>
				<span class="subBtn" @click="$router.push('/user/repayTip')">确定</span>
			</div>
		</div>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	//引入银行信息json数据
	import banks from '../../../data/bankId.json';

	export default {
		data(){
			return {
				data:{},
				showDelay:true,	//开关--显示等待转圈
				bank:banks,
				total:0,		//接受-需要还款总额
				order:0,		//接受-订单id
				id:0,			//接受-分期id
			}
		},
		computed:{
			personInfo:function(){
				//获取用户名
				var userName = this.data.userRealName;
				var returnName = '';
					//用户名显示格式（中间加*号）：
					returnName = userName.substring(0,1) + '*'
					if(userName.length > 2) returnName += userName.substring(userName.length-1,userName.length);
				//获取身份证号
				var personId = this.data.userInfo.personCard;
					//银行卡号格式（中间加*号）：
					personId = personId.substring(0,6)+'*********'+personId.substring(personId.length-3,personId.length);
				//按格式返回完整的如-> 张*章（441723*********233)
				return returnName + '(' + personId + ')';
			},
			bankInfo:function(){
				//获取银行卡尾号
				var tailNum = this.data.bankCard.substring(this.data.bankCard.length-4,this.data.bankCard.length);
				//按钮格式返回值->例如-> 建设银行尾号(3635)
				return this.bank[this.data.bankCardId].name + '(' + tailNum + ')';
			}
		},
		methods:{
			sendAjax(){
				//从参数中获取总额、订单id、分期id
				this.order = this.$route.params.order;
				this.id = this.$route.params.id;
				this.total = this.$route.params.total;
				//发送ajax
		    	this.$ajax('order/detail4web.json',{
		    		'appId':this.appInfo.appId,
					'orderId':String(this.order)
		    	},(rs)=>{
		    		this.data = rs.data;
					this.showDelay=false;
		    	})
		    	//ajax完成
			}
		},
		mounted:function(){
			//发送ajax--获取信息
			this.sendAjax();
		},
		activated:function(){
			//获取页面参数
			var pOrder = this.$route.params.order,
				pId = this.$route.params.id,
				pTotal = this.$route.params.total;
			//判断缓存中的订单Id等是否一致,如果有任意不一致则重新发ajax
			if(pOrder !== this.order || pId !== this.id || pTotal !== this.total )	this.sendAjax();
		}
	}
</script>