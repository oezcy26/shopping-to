<template>
  <div>
    <vue-playground title="Das ist mein Spielplatz" username="Özcan"/>
    <vue-playground title="Das ist der zweite Spielplatz" v-bind:username="mainUsername"/>
  </div>
</template>

<script>



export default {
  name: 'PageContent',
  components: {
    
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
