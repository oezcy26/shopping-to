<template>

  <div id="app">


  </div>
</template>

<script>

  //import SideBar from './components/Sidebar'

  export default {
    name: 'App',
    data: function(){
      return {
        title: 'ShoppTeam'
      }
    },
    components: {
      //SideBar
    },
    methods:{
      test: function(){
        alert('test');
      }
    }
  }

</script>

<style>
  /* @import 'debug.css'; */
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
