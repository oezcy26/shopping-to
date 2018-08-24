<template>

  <div id="app">
    <side-bar v-on:actualSite="onActualSiteChanged($event);"></side-bar>
    <h1>{{title}}</h1>

    <div v-if="actualSite == 1">
      <vue-playground title="Das ist Spielplatz 1" username="Özcan"/>
    </div>

    <div v-if="actualSite == 2">
      <vue-playground title="Das ist Spielplatz 2" v-bind:username="mainUsername"/>
    </div>

  </div>
</template>

<script>

  import SideBar from './components/Sidebar'
  import PageContent from './components/PageContent'
  import VuePlayground from '@/components/VuePlayground'

  export default {
    name: 'App',
    data: function(){
      return {
        title: 'ShoppTeam',
        mainUsername: 'Nelson',
        actualSite: 1
      }
    },
    components: {
      PageContent, SideBar, VuePlayground
    },
    methods:{
      onActualSiteChanged: function(newSite){
        this.actualSite = newSite;
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
