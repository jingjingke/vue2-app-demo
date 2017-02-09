<template>
	<div class="userBorrow">
		<borrowTitle :idx='3'></borrowTitle>
		<borrowList v-if='hasBorrow' :items='list'></borrowList>
		<pageError v-if='noBorrow' :msg='borrowMsg' :class='borrowCls'></pageError>
		<noMore v-if='noMore'></noMore>
		<transition name="delay">
			<delayTime v-if='showDelay'></delayTime>
		</transition>
	</div>
</template>
<script>
	export default {
	    data () {
	        return {
	            hasBorrow:false,				//开关-借款列表
	            noBorrow:false,					//开关-提示是否有借款
	            noMore:false,					//开关-提示-->没有更多
	            borrowMsg:'没有任何借款记录',
	            borrowCls:'error-txt',
	            list:[],								//数据列表
	            pageHeight:document.body.clientHeight,	//页面一屏的高度
	            hasNext:false,							//是否有下一页
	            currentPage:1,							//页码
	            showDelay:true,							//开关--显示等待转圈
	            appId:''								//记录appId
	        }
	    },
	    methods:{
	    	handleScroll(){
	    		//获取滚动条高度及页面总长度
	    		var scrollTop = document.body.scrollTop;
	    		var allHeight = document.body.scrollHeight;
	    		//如果滚动高度=页面总长-页面一屏的高度（即--滚动条到了底部）
	    		if(scrollTop == allHeight - this.pageHeight){
	    			//如果还有下一页，则传递页码发送ajax,否则显示更多
	    			if(this.hasNext == true)	this.sendAjax(this.currentPage);
	    			else{
	    				this.noMore = true;
	    				window.removeEventListener('scroll',this.handleScroll);
	    			}
	    		}
	    	},
	    	sendAjax(thisPage){
	    		//记录当前缓存的appId用于后面区分
	    		this.appId = this.appInfo.appId;
	    		//发送ajax
	    		this.$ajax('order/list.json',{
	    			'appId':this.appInfo.appId,
					'statusType':'4',
					'page_size':'8',
					'target_page':String(thisPage)
	    		},(rs)=>{
	    			//判断data结果条数是否存在，[不存在则不展示列表]
	    			this.showDelay = false;
					if(rs.totalSize !== undefined){
						this.hasBorrow = true;
						//如果结果存在
						this.hasNext = rs.hasNext;				//获取是否拥有下一页
						if(this.hasNext) this.currentPage++;	//如果有下一页则当前页码+1
						//列表填充数据
						for(var i =0; i < rs.data.length; i++){
							this.list.push(rs.data[i])
						}
						//监听滚动条
						window.addEventListener('scroll',this.handleScroll);
					}else{
						this.noBorrow = true;
					}
	    		})
	    		//ajax完成
	    	}
	    },
	    mounted:function(){
	    	//打开页面即发送ajax
	    	this.sendAjax(this.currentPage);
	    },
	    activated:function(){
	    	//如果缓存Id与当前ID不一致则需要重置相关信息并且重新获取数据
	    	if(this.appInfo.appId !== null && this.appId !=='' && this.appInfo.appId !== this.appId){
	    		//重置相关信息
	    		this.hasBorrow = false;
	    		this.noBorrow = false;
	    		this.noMore = false;
	    		this.list = [];
	    		this.hasNext = false;
	    		this.currentPage = 1;
	    		this.showDelay = true;
	    		//重发ajax
	    		this.sendAjax(this.currentPage);
	    	}
	    	//监听滚动条操作
	    	window.addEventListener('scroll',this.handleScroll);
	    },
	    deactivated:function(){
	    	//解除监听滚动条操作
	    	window.removeEventListener('scroll',this.handleScroll);
	    },
	    beforeDestroy:function(){
	    	//解除监听滚动条操作
	    	window.removeEventListener('scroll',this.handleScroll);
	    }
	}
</script>