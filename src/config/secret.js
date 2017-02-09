import CryptoJS from 'crypto-js/core';	
import AES from 'crypto-js/aes';	
import MD5 from 'crypto-js/md5';	
import ECB from 'crypto-js/mode-ecb';

var secret = {
	//公钥
	pluSecret : '-',
	//加密的函数，传递key-value
	getSecret : function(thisValue,thisKey){
		var key = CryptoJS.enc.Utf8.parse(thisKey);
		if(thisKey === undefined) key = CryptoJS.enc.Utf8.parse(this.pluSecret);
		var encrypted = CryptoJS.AES.encrypt(thisValue, key, { mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
		return String(encrypted);	
	},
	//解密的函数，传递key-valu
	backSecret : function(thisValue,thisKey){
	    var key = CryptoJS.enc.Utf8.parse(thisKey);
	    if(thisKey === undefined) key = CryptoJS.enc.Utf8.parse(this.pluSecret);
	    var decrypted = CryptoJS.AES.decrypt(thisValue, key, { mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
		return decrypted.toString(CryptoJS.enc.Utf8);
	},
	//MD5签名
	md5 : function(thisValue){
		return String(CryptoJS.MD5(thisValue));
	},
	//数据加密流程
	reData : function(dataObj,appSecret){
		//如果没有传私钥的话，则使用公钥（情况少）
		if(appSecret === undefined) appSecret = this.pluSecret;
		
		//var预定义空字符串
		var keys = [];
		var returnData = {};
		var str = '';
		//将对象仅值加密，且将参数名输入到keys数组
		for(var key in dataObj){
			if(key != 'appId'){
				dataObj[key] = String(this.getSecret(dataObj[key],appSecret));
			}
			keys.push(key)
		}
		//数据排序
		keys = keys.sort();
		//组织用于签名的字符串
		for(var iNum = 0; iNum < keys.length ; iNum ++){
			str+= dataObj[keys[iNum]];
		}
		str += appSecret;
		//MD5签名-将sign向数据（obj）中添加		
		dataObj['sign'] = String(this.md5(str));
		//开始全局公钥加密
		for(var key in dataObj){
			returnData[this.getSecret(key,this.pluSecret)] = this.getSecret(String(dataObj[key]),this.pluSecret);
		}
		//返回值
		return returnData;
	}
	
}

export default secret;
