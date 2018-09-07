<template>

  <div id="app">

    <b-navbar toggleable="false" type="dark" variant="info">
      <b-navbar-brand href="#">{{title}}</b-navbar-brand>

    </b-navbar>


    <b-list-group>
      <b-list-group-item v-for="i in items"
        class="d-flex justify-content-between align-items-center">
        {{i.title}}
        <b-btn @click="removeItem(i)" variant="danger" size="sm"
          style="background-color: #ff7c89;">x</b-btn>
      </b-list-group-item>
    </b-list-group>

    <br />

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

  //import SideBar from './components/Sidebar'
  import Firebase from 'firebase'

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
      items: itemRef
    },
    data: function(){
      return {
        title: 'Dringende Einkäufe',
        newItemTitle: ''
      }
    },
    components: {
      //SideBar
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

</style>
