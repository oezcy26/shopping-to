<template>
  <div id="app">

    <!-- Top bar
    <b-navbar toggleable="false" type="dark" variant="info"
      style="padding: 0px 16px; margin-bottom: 10px;">
      <b-navbar-brand href="#">{{title}}</b-navbar-brand>
    </b-navbar>
     -->

    <b-tabs v-model="tabIndex"
      v-hammer:swipe.left="onSwipeLeft" >

      <b-tab title="Favoriten">

      </b-tab>

      <b-tab title="Einkäufe">
        <!-- Item liste -->
        <div v-if="loading" align="center" style="width:100%;">
          <loading-spinner ></loading-spinner>
        </div>
        <div v-else>
          <b-list-group v-if="items.length > 0">
            <b-list-group-item v-for="i in items"
              class="d-flex justify-content-between align-items-center"
              style="padding: 4px 0px; padding-left: 20px;">
              {{i.title}}
              <b-btn @click="removeItem(i)" variant="danger" size="sm"
              style="background-color: #ff7c89;">x</b-btn>
            </b-list-group-item>
          </b-list-group>
          <lazy-smiley v-else></lazy-smiley>
        </div>


      </b-tab>

    </b-tabs>


    <!-- New item input field -->
    <b-navbar toggleable="false" type="light" variant="info" fixed="bottom">
      <b-nav-form @submit="addNewItem" style="width: 100%;">
        <b-input-group >
          <b-form-input v-model="newItemTitle" placeholder="Was musst du kaufen?" size="" required type="text" />
          <b-input-group-append>
            <b-btn type="submit" variant="secondary" size="">Ok</b-btn>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>
    </b-navbar>

  </div>
</template>

<script>

  import LazySmiley from './components/LazySmiley'
  import LoadingSpinner from './components/LoadingSpinner'
  import Firebase from 'firebase'

  //TODO api-key weg von github !!

  let config = {
    apiKey: "AIzaSyAr3nsqdrro1dV98_YL-PY9yY3K7SApTbY",
    authDomain: "shopping-to.firebaseapp.com",
    databaseURL: "https://shopping-to.firebaseio.com",
    projectId: "shopping-to",
    storageBucket: "shopping-to.appspot.com",
    messagingSenderId: "891689673651"
  }

  let app = Firebase.initializeApp(config);
  let db = app.database();

  let itemRef = db.ref('items')

  export default {
    name: 'App',
    firebase: {
      items: {
        source: itemRef,
        readyCallback: function(){
          this.loading = false;
        }
      }
    },
    data: function(){
      return {
        loading : true,
        title: 'Dringende Einkäufe',
        newItemTitle: '',
        numberOfTabs: 2,
        tabIndex : 1
      }
    },

    mounted: function(){
    },
    components: {
      LazySmiley, LoadingSpinner
    },
    methods:{
      test: function(){
        alert('test');
      },
      addNewItem: function(evt){
        evt.preventDefault();
        itemRef.push({title: this.newItemTitle});
        this.newItemTitle = '';
      },
      removeItem: function(item){
        itemRef.child(item['.key']).remove();
      },
      onSwipeLeft: function(){
        this.tabIndex--;
        if(this.tabIndex < 0){
          this.tabIndex = this.numberOfTabs - 1;
        }
      },
      onSwipeRight: function(){
        this.tabIndex++;
        if(this.tabIndex == this.numberOfTabs){
          this.tabIndex = 0;
        }
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
    margin-top: 0px;
    padding-bottom: 70px;

  }

  .siteHeader{
    padding: 20px 10px;
    background-color: #c6c6f5; /* light blue */
  }

  body{
    height: 100%;
  }

</style>
