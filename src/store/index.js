import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		userPages:{	//页面是否更新
			index:false,
			borrowList1:false,
			borrowList2:false,
			borrowList3:false,
			borrowList4:false,
			repayList:false,
			repayRecord:false
		},
		borrowDetail:{},	//记录borrow数据
		borrowArry:[],		//模拟borrow指针(真实为被加载进来的数据)
		
		repayList:'',		//记录全部待还借款列表
		repayGroup:{},		//记录指定Id的待还订单
		repayArr:[]			//模拟repayGroup指针(便于当数据达到指定个数时将先加载进来的数据删除)
	},
	mutations:{
		//更新首页状态
		uploadIndex(state,val){
			state.userPages.index = val
		},
		//更新借款列表页状态
		uploadBorrow(state,param){
			if(param.num === 0){
				for(var i =1; i<= 4; i++) state.userPages['borrowList'+i] = param.val;
			}else{
				state.userPages['borrowList'+param.num] = param.val;
			}
		},
		//新增borrowDetail内容[保存json数据]
		addBorrow(state,param){
			var num = 5;	//表示实际可以拥有num++个对象可以被保存，多余的则删除(例num=5时实际是可以存6条json数据)
			if(state.borrowArry.length > num){
				delete state.borrowDetail[state.borrowArry[num]];
				state.borrowArry.pop();
			}
			state.borrowDetail[param.id] = param.val;
			state.borrowArry.unshift(param.id);
		},
		//更新全部待还款订单
		uploadRepay(state,param){
			state.repayList = param.flag;
			if(param.flag === true){
				state.repayList = ''
			}else{
				state.repayList = param.data
			}
		},
		//新增repayGroup单个订单（同addBorrow类似）
		addRepay(state,param){
			var num = 5; //表示实例拥有num++个 json对象允许被保存
			if(state.repayArr.length > num){
				delete state.repayGroup[state.repayArr[num]];
				state.repayArr.pop();
			}
			state.repayGroup[param.id] = param.val;
			state.repayArr.unshift(param.id);
		},
		//更新还款记录
		uploadRecord(state,val){
			state.userPages.repayRecord = val
		}
	}
})