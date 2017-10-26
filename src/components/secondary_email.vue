<template>
	<div id='secondaryEmail'>
		<Table  stripe border :columns="columns1" :data="data2" :loading="loading" ></Table>
		<div style="text-align: center;">
			<Page :total="total" show-elevator show-total @on-change='pageNum'></Page>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				loading:false,
				getUrl:this.GLOBAL.url,
				total: 0,
				page:'',
				size:14,
				columns1: [{
						title: 'id',
						key: 'id'
					},
					{
						title: 'email',
						key: 'email'
					},
					{
						title: 'password',
						key: 'password'
					},
					{
						title: 'bound_count',
						key: 'bound_count'
					},
					{
						title: 'updateTime',
						key: 'updatetime'
					},
				],
				data2: []
			}
		},
		created: function() {
			var self = this;
			self.page = 1;
			axios.get(this.getUrl+'secondary_email_count')
				.then(function(response) {
					self.total = response.data[0].total;
//					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			pageNum(page) {
				this.page = page
				console.log("page", this.page)
			},
		},
		watch: {
			page() {
				//console.log("wathc page",this.page,this.size)
				self = this;
				self.loading = true;
				if (this.page == 0){
					this.page = 1;
//					console.log(this.page );
				}
				var start = (this.page - 1) * this.size;
//				console.log("data",start,this.size)
				axios.post(this.getUrl+'secondary_email', {
						start: start,
						size: this.size
					})
					.then(function(response) {
						self.data2 = response.data;
						self.loading = false;
//						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

		},
	}
</script>