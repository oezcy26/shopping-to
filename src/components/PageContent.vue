<template>
  <div>
    <h1>{{title}}</h1>
    <vue-playground title="Das ist mein Spielplatz" username="Özcan"/>
    <vue-playground title="Das ist der zweite Spielplatz" v-bind:username="mainUsername"/>
  </div>
</template>

<script>

import VuePlayground from '@/components/VuePlayground';

export default {
  name: 'PageContent',
  components: {
    VuePlayground
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
