<template>
	<div id="app" style="text-align: center;">
		<Input v-model="value" placeholder="请输入..." style="width: 300px" type="textarea"></Input>
		<Button type="primary" shape="circle" icon="ios-search" @click="search"></Button>
		 <Input v-model="data1" type="textarea" :rows="4" placeholder="请输入..."></Input>
		
	</div>
		

</template>

<script>
	import axios from 'axios' 
	export default {
        data () {
            return {
            	getUrl: this.GLOBAL.url,
                value: '',
                data1:''
            }
        },
        methods:{
        search(){
        	   var self = this;
//				console.log(this.value)
				axios.post(this.getUrl + 'manual', {
						sql: this.value
					})
					.then(function(response) {
						self.data1 = response.data
//						self.loading = false;
						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},	
        }
    }
</script>

<style>
	
</style>