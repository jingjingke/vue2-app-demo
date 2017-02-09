<template>
	<div class="container">
		<topComponent title='我的奖励'>
			<span class="back" @click="$router.push('/user')" slot="left">返回</span>
		</topComponent>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>