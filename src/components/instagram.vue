<template>
    <Table stripe :columns="columns1" :data="data1" :loading="loading" border></Table>
</template>
<script>
	import axios from 'axios'
    export default {
        data () {
            return {
            	loading:false,
            	getUrl: this.GLOBAL.url,
                columns1: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'yahoo_email',
                        key: 'yahoo_email'
                    },
                    {
                        title: 'username',
                        key: 'username'
                    },
                    {
                    	title: 'password',
                    	key: 'password'
                    }
                ],
                data1: []
            }
        },
       	created: function() {
			var self = this;
			self.loading = true;
			axios.post(this.getUrl + 'instagram', {
					})
					.then(function(response) {
						self.data1 = response.data
						self.loading = false;
						//						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
		},
    }
</script>
