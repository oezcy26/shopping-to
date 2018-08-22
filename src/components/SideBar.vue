<template>
  <div class="sidenav">
    <a href="#" v-on:click="onNavItemClicked(1)">Spielplatz 1</a>
    <a href="#" v-on:click="onNavItemClicked(2)">Spielplatz 2</a>
  </div>
</template>

// use v-model with components: https://vuejs.org/v2/guide/components.html

<script>
export default {
  name: 'Sidabar',
  data () {
    return {

    }
  },
  methods: {
    onNavItemClicked: function(idx){
      this.actualSite = idx;
      this.$emit('actualSite', this.actualSite);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /* The sidebar menu */
  .sidenav {
      height: 100%; /* Full-height: remove this if you want "auto" height */
      width: 160px; /* Set the width of the sidebar */
      position: fixed; /* Fixed Sidebar (stay in place on scroll) */
      z-index: 1; /* Stay on top */
      top: 0; /* Stay at the top */
      left: 0;
      background-color: #111; /* Black */
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 20px;
  }

  /* The navigation menu links */
  .sidenav a {
      padding: 6px 8px 6px 16px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
  }

  /* When you mouse over the navigation links, change their color */
  .sidenav a:hover {
      color: #f1f1f1;
  }

  /* Style page content */
  .main {
      margin-left: 160px; /* Same as the width of the sidebar */
      padding: 0px 10px;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
  }
</style>
