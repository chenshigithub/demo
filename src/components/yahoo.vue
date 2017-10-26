<template>
	<div id='yahoo_table'>
		<div id="input" style="text-align: center;">
			<Input v-model="value" placeholder="请输入id或email" style="width: 300px"></Input>
			<Button type="primary" shape="circle" icon="ios-search" @click="search"></Button>
		</div>
		<br />
		<div style="text-align: center;">
			<Page show-total :total="total" placement="bottom" :page-size-opts="page_Size" show-sizer @on-change='pageNum' @on-page-size-change='pageSize'></Page>
		</div>
		<Table stripe border :columns="columns8" :loading="loading" :data="data7" size="small" ref="table"></Table>

	</div>

</template>
<script>
	import axios from 'axios'
	export default {
		//		el:'#yahoo_table',
		data() {
			return {
				value: '',
				loading: false,
				getUrl: this.GLOBAL.url,
				total: 0,
				page: '',
				size: 10,
				page_Size: [10, 50, 100, 200],
				data7: [],
				columns8: [{
						"title": "id",
						"key": "id",
						"fixed": "left",
						"width": 75
					},
					{
						"title": "process_index",
						"key": "process_index",
						//						"width": 150,
						//						"sortable": true,
					},
					{
						"title": "first_name",
						"key": "first_name",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "last_name",
						"key": "last_name",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "email",
						"key": "email",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "password",
						"key": "password",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "reg_time",
						"key": "reg_time",
						//						"width": 150,
						"sortable": true
					},
					{
						"title": "status",
						"key": "status",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "account_index",
						"key": "account_index",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "ip_category",
						"key": "ip_category",
						//						"width": 150,
						//						"sortable": true
					},
					{
						"title": "bind_state",
						"key": "bind_state",
						//						"width": 120,
						"sortable": true
					},
					{
						"title": "reg_ins",
						"key": "reg_ins",
						//						"width": 100,
						"sortable": true
					}
				],
			}
		},
		created: function() {
			this.page = 1;
			var self = this;
			axios.get(this.getUrl + 'yahoo_count')
				.then(function(response) {
					self.total = response.data[0].total;
					//					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			search(){
				console.log(this.value)
				axios.post(this.getUrl + 'searchYahoo', {
						value: this.value
					})
					.then(function(response) {
						self.data7 = response.data
						self.loading = false;
						//						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			pageNum(page) {
				this.page = page
				//				console.log("page", this.page)
			},
			pageSize(size) {
				this.size = size
				this.page = 0
				//console.log("size",size)
			},
			exportData(type) {
				if(type === 1) {
					this.$refs.table.exportCsv({
						filename: '原始数据'
					});
				} else if(type === 2) {
					this.$refs.table.exportCsv({
						filename: '排序和过滤后的数据',
						original: false
					});
				} else if(type === 3) {
					this.$refs.table.exportCsv({
						filename: '自定义数据',
						columns: this.columns8.filter((col, index) => index < 4),
						data: this.data7.filter((data, index) => index < 4)
					});
				}
			}
		},
		watch: {
			page() {
				//console.log("wathc page",this.page,this.size)
				self = this;
				self.loading = true;
				if(this.page == 0) {
					this.page = 1;
					//					console.log(this.page );
				}
				var start = (this.page - 1) * this.size;
				//				console.log("data",start,this.size)
				axios.post(this.getUrl + 'yahoo', {
						start: start,
						size: this.size
					})
					.then(function(response) {
						self.data7 = response.data
						self.loading = false;
						//						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
			},

		},
		//		computed:{
		//			size(){
		//				console.log("computed end",this.end)
		//			}
		//		}
	}
</script>