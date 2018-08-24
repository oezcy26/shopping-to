<template>
  <fieldset>
    <legend><b>{{title}} - {{username}}</b></legend>

    <p>
      <span v-bind:title="time">
        Hover your mouse over me to see actual time.
      </span>
    </p>

    <p>
      <input type="checkbox" v-model="seeText" />
      <span v-if="seeText">Ja, du willst mich!</span>
    </p>

    <p>
      <ul>
        <li v-for="b in burgers">{{b.name}} <button v-on:click="deleteBurger(b)">X</button></li>
      </ul>
      <button v-on:click="addHamburger">Hamburger</button>
    </p>

    <p>
      <input type="text" v-model="customText"/>
      <button v-on:click="addCustomBurger(customText)">Ok</button>
    </p>

  </fieldset>
</template>

<script>

export default {
  name: 'VuePlayground',
  props: ['title', 'username'],
  data () {
    return {
      time: '' + new Date().toLocaleString(),
      seeText: false,
      customText: '',
      burgers: [
        {name:'Big Mac'},
        {name:'Big King XXL'},
        {name:'Long Cheese Chilli Chicken'}
      ]
    }
  },
  methods: {
    addHamburger: function(){
      this.burgers.push({name:'Hamburger'});
    },
    addCustomBurger: function(cstmText){
      this.burgers.push({name:cstmText});
      this.customText = '';
    },
    deleteBurger: function(burger){
      let idx = this.burgers.indexOf(burger);
      this.burgers.splice(idx,1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
