<template>
	<div id="ip_list">
		<Upload 
			:on-success="handleSuccess"  type="drag" :action="uploadUrl">
			<div style="padding: 20px 0">
				<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
				<p>点击或将文件拖拽到这里上传</p>
			</div>
		</Upload>
		<Table height="900" stripe border :columns="columns1" :data="data2" :loading="loading" ></Table>
	</div>

</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				loading:false,
				getUrl: this.GLOBAL.url,
				uploadUrl:'',
				columns1: [{
						title: 'id',
						key: 'id'
					},
					{
						title: 'ip',
						key: 'ip'
					},
					{
						title: 'updateTime',
						key: 'updatetime',
						"sortable": true
					}
				],
				data2: []
			}
		},
		created: function() {
			var self = this;
			self.loading = true;
			this.uploadUrl = this.getUrl + 'upload';
			axios.get(this.getUrl + 'ip_list')
				.then(function(response) {
					self.data2 = response.data;
					self.loading = false;
//					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			 handleSuccess (res, file) {
              console.log(file)
            },
           
		}
	}
</script>