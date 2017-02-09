<template>
	<div class="container bgF">
		<topComponent title='登录' :showLeft='false'></topComponent>
		<h2 class="logoIcon">草根金融</h2>
		<ul class="formCom form-login form-mini">
			<li class="icon-clear">
				<label>
					<span>账号</span>
					<input type="text" placeholder="请输入手机号" v-model.trim='name' >
					<i @click='name = ""'></i>
				</label>
			</li>
			<li :class='[{"icon-eye1":showPwd},{"icon-eye2":!showPwd}]'>
				<label>
					<span>密码</span>
					<input type="password" placeholder="请输入6-12位密码" v-model.trim='pwd' v-if='showPwd' >
					<input type="text" placeholder="请输入6-12位密码" v-model.trim='pwd' v-if='!showPwd'>
					<i @click='showPwd = !showPwd'></i>
				</label>
			</li>
			<li>
				<label>
					<span>验证码</span>
					<input type="text" placeholder="请输入图形验证码" v-model.trim='code'>
				</label>
				<canvas id="canvas" class="code-img" @click='changeCode'></canvas>
			</li>
		</ul>
		<div class="btnWarp">
			<span class="subBtn"	@click='logIn'>登录</span>
		</div>
		<div class="forgetWarp">
			<span class="col6"		@click="$router.push('/reg')">马上注册</span>
			<span class="fr col6"	@click="$router.push('/forget')">忘记密码？</span>
		</div>
		<transition name="scale">
			<dialogPopup :class='diglogClass' :msg='diglogCont' v-show='diglogShow'></dialogPopup>
		</transition>
	</div>
</template>
<script>
	//获取页面来源
	import pageFrom from '../../assets/lib/pageFrom';
	//获取canvas校验码
	import canvasCode from '../../assets/lib/canvasCode';
	
	export default {
	    data () {
	        return {
	        	name:'',
	        	pwd:'',
	        	code:'',			
	        	showPwd:true,		//开关--密码可见
	        	diglogShow:false,	//开关--显示diglog组件
	        	appId:'',
	        	secret:'',
	        	canvas:{}
	        }
	    },
	    methods :{
	        logIn () {
	        	//先做一些简单的判断再提交ajax
	        	if( this.checkRE['phone'].test(this.name) == false )		this.callDialog('帐号不正确');
	        	else if( this.checkRE['pwd'].test(this.pwd) == false )		this.callDialog('密码不正确');
	        	else if( this.code.toUpperCase() !== canvasCode.codeNums.toUpperCase() )	this.callDialog('验证码不正确');
	        	else{
	        		//发送ajax
	        		this.sendAjax();
	        	}
	        },
	        sendAjax(){
        		//发送ajax--用于登录
        		this.$ajax('account/login.json',{
        			'account':this.name,
        			'password':this.pwd,
        			'appId':this.appId,
        			'accessFrom':pageFrom
        		},(rs)=>{
        			//登录成功将私钥与ID传到全局使用
        			this.getSecret(this.appId,this.secret);
        			//并且跳转到用户中心页面
        			this.$router.push('/user');
        		},this.secret,(rs)=>{
        			//登录出错时，清空表单并抛出错误
        			this.name = '';
					this.pwd = '';
					this.code = '';
					this.callDialog(rs.errorMsg,'text');
        		}) 
        		//完成ajax
        	},
	        getID(){
	        	//发送ajax--用于获取appId及私钥
		    	this.$ajax('secret_key/generate.json',{
		    		'accessFrom':pageFrom
		    	},(rs)=>{
		    		//成功后将私钥与appId暂时只绑定在该页面(登录成功后再绑定到全局)
		    		this.appId = rs.data.appId;
		    		this.secret = rs.data.appSecret;
		    	},'plu')
		    	//完成ajax
	        },
	        changeCode(){
	        	//点击刷新二维码
	        	canvasCode.createCode(this.canvas);
	        }
	    },
	    mounted:function(){
	    	//获取私钥与Id
	    	this.getID();
	    	//获取canvas选择器用于传递刷新验证码
	    	this.canvas = document.getElementById('canvas');
	    	this.changeCode();
	    },
	    activated:function(){
	    	//每次进入都重新刷新验证码
	    	this.changeCode();
	    	//清除被记录的密码与验证码
	        this.pwd = '';
	        this.code = '';
			//判断全局appId与当前appId是否一致 （点击退出登录时会重新更新全局appId,而当前appID只要赋值一次就会被缓存）
			if(this.appInfo.appId !== null && this.appId !=='' && this.appInfo.appId !== this.appId)	this.getID();
	    }
	}
</script>