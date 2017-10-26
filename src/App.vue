<template>
  <div id="my_sys">
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <Submenu name="1">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                yahoo数据库
            </template>
            <MenuGroup title="数据表">
                <router-link to="/yahoo"><MenuItem name="3-1">查看yahoo表</MenuItem></router-link>
                <router-link  to="/instagram"><MenuItem name="3-2" >instagram账号</MenuItem></router-link>
                <router-link  to="/drawYahoo"><MenuItem name="3-3">提取Yahoo邮箱</MenuItem></router-link>
                <router-link  to="/secondaryEmail"><MenuItem name="3-4">yahoo备用邮箱</MenuItem></router-link>
                <router-link  to="/manualQueries"><MenuItem name="3-5">手动查询</MenuItem></router-link>
            </MenuGroup>
            <MenuGroup title="代理">
                <router-link  to="/ipList"><MenuItem name="3-5">1000代理</MenuItem></router-link>
            </MenuGroup>
        </Submenu>
        
    </Menu>
    <br>
 
    <div >
    	<router-view></router-view>
    </div> 
  </div>
</template>

<script>

	
export default {
  name: 'my_sys',
  data () {
            return {
                theme1: 'dark'
            }
        }
 
}
</script>

<style>

</style>
