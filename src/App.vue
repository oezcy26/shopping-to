<template>

  <div id="app">
    <side-bar v-on:actualSite="onActualSiteChanged($event);"></side-bar>
    <page-content></page-content>




  </div>
</template>

<script>

  import SideBar from './components/Sidebar'
  import PageContent from './components/PageContent'

  export default {
    name: 'App',
    data: function(){
      return {
        title: 'ShoppTeam',
        mainUsername: 'Nelson'
      }
    },
    components: {
      PageContent, SideBar
    },
    methods:{
      onActualSiteChanged: function(newSite){
        alert('New Site choosen:  ' + newSite);
      }
    }
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
