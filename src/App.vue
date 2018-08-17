<template>
  <div id="app">
    <h1>{{title}}</h1>
    <vue-playground/>
  </div>
</template>

<script>

  import VuePlayground from './components/VuePlayground';

  export default {
    name: 'App',
    data: function(){
      return {
        title: 'ShoppTeam'
      }
    },
    components: {
      VuePlayground
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
