<template>

  <div id="app">
    <side-bar v-on:actualSite="onActualSiteChanged($event);"></side-bar>
    <h1>{{title}}</h1>
    <a class="waves-effect waves-light btn" v-on:click="test()">button</a>

    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>

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
      },
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
