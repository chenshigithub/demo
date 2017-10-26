<template>
	<div id="drawYahoo">
		<Row>
			<Col span="2">
			</Col>
			<Col span="6" >
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
				<FormItem label="可提数" prop="count">
					<Input v-model="formValidate.count" disabled style="width: 100px"></Input>
				</FormItem>
				<FormItem label="提取数" prop="num">
					<Input style="width: 100px" :max="formValidate.count" :min="1" v-model="formValidate.num" placeholder="请输入提取邮箱数"></Input>
				</FormItem>
				<FormItem label="提取人" prop="name">
					<CheckboxGroup v-model="formValidate.name">
						<Checkbox label="dongsong">
							<Icon type="man"></Icon>
							<span>东松</span></Checkbox>
						<Checkbox label="zhangjing">
							<Icon type="woman"></Icon>
							<span>张静</span></Checkbox>
					</CheckboxGroup>
				</FormItem>
				<FormItem label="选择日期" prop="date">
					<DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
					<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
				</FormItem>
			</Form>
			</Col>
			<Col span="16">
			<Table stripe border :columns="columns8" :loading="loading" :data="data7" size="small" ref="table" height="600"></Table>
			<br />
			<Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
			</Col>
		</Row>

	</div>

</template>
<script>
		import axios from 'axios'
	var formatDate = function(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	};
	export default {
		data() {
			return {
				filename:'',
				loading : 'false',
				getUrl:this.GLOBAL.url,
				formValidate: {
					count: 100,
					num: '',
					name: [],
					date: '',
				},
				ruleValidate: {
					num: [{
						required: true,
						message: '请输入提取数',
						trigger: 'blur'
					}, ],
					name: [{
							required: true,
							type: 'array',
							min: 1,
							message: '至少选择一个提取人',
							trigger: 'change'
						},
						{
							type: 'array',
							max: 2,
							message: '最多选择两个爱好',
							trigger: 'change'
						}
					],
					date: [{
						required: true,
						type: 'date',
						message: '请选择日期',
						trigger: 'change'
					}],
				},
				data7: [],
				columns8: [{
						"title": "id",
						"key": "id",
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
				],
			}
		},
		created: function() {
			var self = this;
			axios.get(this.getUrl+'drawEmailCount')
				.then(function(response) {
					self.formValidate.count = response.data[0].total;
//					console.log(response);
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		methods: {
			handleSubmit(name) {
				var self = this;
				self.loading = true;
				this.$refs[name].validate((valid) => {
					if(valid) {
						var num = this.formValidate.num;
						var name = this.formValidate.name;
						var time = this.formValidate.date;
						time = formatDate(time);
						var human = '';
						for(let i = 0; i < name.length; i++) {
							human += name[i];
							human += ' ';
						}
						var str = 'fetched by' + human + ' ' + time;
						self.filename = human+'_'+time;
						console.log(num, str)
						axios.post(this.getUrl+'drawEmail', {
						num: num,
						str: str
					})
					.then(function(response) {
						self.data7 = response.data
						self.loading = false;
//						console.log(response);
					})
					.catch(function(error) {
						console.log(error);
					});
						this.$Message.success('提交成功!');
					} else {
						this.$Message.error('表单验证失败!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			},
			exportData (type) {
				var self = this;
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: self.filename,
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            }        
		}
	}
</script>