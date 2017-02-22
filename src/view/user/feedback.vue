<template>
	<div class="container">
		<topComponent title='意见反馈'><span class="save" @click='goSave' slot="right">提交</span></topComponent>
		<div class="feedBack mt20">
			<div class="feed-text" :class='{col5 : textArea!==defaultVal}'>
				<textarea maxlength="200" class="limitFeed" @focus='textFocus()' @blur='textBlur()' v-model.tirm='textArea'></textarea>
			</div>
			<p class="feed-num">还可以输入<span class="limitNum">{{textNum}}</span>个字</p>
		</div>
		<transition name="scale">
			<dialogPopup :class='diglogClass' :msg='diglogCont' v-show='diglogShow'></dialogPopup>
		</transition>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	            defaultVal:'感谢您对草根金融的关注，您的意见和建议能帮助我们做的更好！',
	            textArea:'',			//绑定textarea
	            textNum:200,			//字数限制
	            diglogShow:false,		//开关--显示diglog组件
	        }
	    },
	    methods :{
	        goSave(){
	        	//点击提交时进行两层判断
	        	if(this.textArea == this.defaultVal || this.textArea.length < 5) {
	        		this.callDialog('字数不能小于5','sort',1200)
	        	}else{
	        		//发送ajax
	        		this.$ajax('user/send_feedback.json',{
	        			'appId':this.appInfo.appId,
	        			'remark':String(this.textArea)
	        		},(rs)=>{
	        			this.callDialog('提交成功','true',1500);
	        			setTimeout(()=>{
							this.$router.push('/user');
						},1500);
	        		})
	        		//ajax完成
	        	}
	        }
	    },
	    watch:{
	    	"textArea":"changeText"
	    },
	    activated:function(){
	    	this.textArea = this.defaultVal;
	    }
	}
</script>