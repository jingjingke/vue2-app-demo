<template>
	<div class="container">
		<topComponent title='草根金融' :showLeft='false'></topComponent>
		<div class="successTips tips-login">
			<h2 class="blue">温馨提示</h2>
	        <p class="tCenter">您的登录信息已过期,请重新登录</p>
	    </div>
		<div class="btnWarp">
			<span class="subBtn" @click="$router.push('/login')">重新登录</span>
		</div>
	</div>
</template>