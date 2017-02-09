<template>
<div class="container">
	<topComponent title='草根金融' :showLeft='false'></topComponent>
	<dl class="userInfo" v-show='!showDelay'>
		<dt>
			<p class="user-logo"></p>
			<p class="user-tel">您好<span>{{data.userMobile | filterPhone}}</span></p>
			<p class="user-tag">
				<span class="mLevel">{{data.levelName}}</span>
				<span class="mName">{{data.levelTitle}}</span>
			</p>
		</dt>
		<dd>申请借款<span>{{data.orderApply}}笔</span></dd>
		<dd>待还借款<span>{{data.orderRepay}}笔</span></dd>
	</dl>
	<ul class="listCom list-arrow list-icon mt20" v-show='!showDelay'>
		<listComponent v-for='item in items' @click="$router.push(item.push)" :class='item.cls' :title='item.tit'></listComponent>
	</ul>
	<p class="signOut mt20" @click='loginOut' v-show='!showDelay'>退出登陆</p>
	<transition name="delay">
		<delayTime v-if='showDelay'></delayTime>
	</transition>
</div>
</template>
<script>
	export default {
	    data () {
	        return {
	        	items:[
	        		{cls:"icon-jiekuan",	push:"/user/borrowList",	tit:"我的借款"},
	        		{cls:"icon-huankuan",	push:"/user/repayList",		tit:"我的还款"},
	        		{cls:"icon-jiangli",	push:"/user/rewardList",	tit:"我的奖励"},
	        		{cls:"icon-help",		push:"/user/helpList",		tit:"帮助中心"},
	        		{cls:"icon-yijian",		push:"/user/feedback",		tit:"意见反馈"},
	        		{cls:"icon-about",		push:"/user/aboutUs",		tit:"关于我们"}
	        	],
	        	showDelay:true,		//开关--显示等待转圈
	        	appId:'',			//记录appId
	        	data:{}
	        }
	    },
	    methods :{
	        loginOut(){
	        	//发送ajax--重新获取新的appId及私钥--替换正常的全局私钥+ID
		    	this.$ajax('secret_key/generate.json',{
		    		'accessFrom':'loginout'
		    	},(rs)=>{
		    		//成功后将私钥与appId替换现有的
		    		this.getSecret(rs.data.appId,rs.data.appSecret);
		    		localStorage.clear();
		    		this.$router.push('/login');
		    	},'plu')
		    	//完成ajax
	        },
	        sendAjax(){
	        	//记录appId用于对比--缓存数据是否更新
	        	this.appId = this.appInfo.appId;
		    	//发送ajax--获取用户信息
		    	this.$ajax('user/get_info_new.json',{
		    		'appId':this.appInfo.appId,
		    		'showUserInfo':'1'
		    	},(rs)=>{
		    		this.data = rs.data.userInfo;
		    		this.showDelay = false;
		    	})
		    	//ajax完成	
	    	}
	    },
	    mounted:function(){
	    	document.body.scrollTop = 0;
	    	//发送ajax--获取个人信息
	    	this.sendAjax();
	    },
	    activated:function(){
	    	//如果被缓存的数据与当前需要数据不一致(判断appId区分)
	    	if(this.appId !== this.appInfo.appId){
	    		this.showDelay = true;
	    		this.sendAjax();
	    	}
	    }
	}
</script>