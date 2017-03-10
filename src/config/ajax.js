import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

//导入数据加密方法
import secretJS from './secret';

//当前运行环境
var domain = 'http://172.16.34.30:9321/cgjr/';
//封装ajax
var ajax = {
	//通用的ajax-post
	common:function(url,data,sucFn,secret,errFn){
		//param说明
		//@url		ajax访问的url
		//@data		post发送的数据
		//@sucFn	ajax成功时运行函数
		//@secret	私钥-有(1)缺省，(2)指定字符plu，(3)正确私钥字符 三种情况
		//@errFn	ajax失败时运行函数(大部分为缺省，但例如登录出错时则需要)
		
		//根据私钥传递的前两种状态 私钥使用的值进行区分
		if(secret === undefined)	secret = Vue.prototype.appInfo.secret;
		else if(secret === 'plu')	secret = secretJS.pluSecret;
		
		//发送ajax
		axios.post(domain + url , qs.stringify(secretJS.reData(data,secret))).then(
			(response) => {
				//先判断appId是否已经过期
				if(response.data != 'appId not exist'){
					//解密数据
					var rs = JSON.parse(secretJS.backSecret(response.data,secret));
					//如果
					if(rs.success == true)	sucFn(rs);
					else{
						if(errFn === undefined){
							//(退出登录或私钥+ID丢失)后访问页面-提示过期
							this.$router.push('/expired');
						}else{
							errFn(rs);
						}
					}
				}else{
					//否则跳转到温馨提示登录过期页面
					this.$router.push('/login');
				}
			}
		)
		//ajax完成
	}
}

export default ajax;
