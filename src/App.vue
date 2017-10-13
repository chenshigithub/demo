<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="head">
    	
    </div>
    <div id="nav_list">
    	<router-link class="nav-item" to="/">index</router-link>
      <router-link class="nav-item" to="/first">页面一</router-link>
      <router-link class="nav-item" to="/second">页面二</router-link>
    </div>
    <div >
    	<router-view></router-view>
    </div> 
  </div>
</template>

<script>

	
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
