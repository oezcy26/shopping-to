<template>
  <div id="app">

    <!-- Top bar
    <b-navbar toggleable="false" type="dark" variant="info"
      style="padding: 0px 16px; margin-bottom: 10px;">
      <b-navbar-brand href="#">{{title}}</b-navbar-brand>
    </b-navbar>
     -->

    <b-tabs pills v-model="tabIndex">

      <!-- **** FAVORITEN ***** -->
      <b-tab title="Favoriten">
        <div v-if="this.refloading" align="center" style="width:100%;">
          <loading-spinner ></loading-spinner>
        </div>
        <div v-else>
          <b-list-group v-if="favorites.length > 0">
            <b-list-group-item v-for="f in favorites"
              class="d-flex justify-content-between align-items-center"
              style="padding: 4px 0px; padding-left: 20px;"
              @click="onFavoriteClicked(f)"
              v-bind:class="{ isUsed: isFavInitems(f) }">
              {{f.title}}
              <b-btn @click="removeFav(i)" variant="danger" size="sm"
              style="background-color: #ff7c89;">x</b-btn>
            </b-list-group-item>
          </b-list-group>
          <lazy-smiley v-else></lazy-smiley>
        </div>

        <b-navbar toggleable="false" type="light" fixed="bottom"
          v-hammer:swipe.left="onSwipeLeft"
          v-hammer:swipe.right="onSwipeRight"
          style="background-color: #4cb817;">
          <b-nav-form @submit="addNewFav" style="width: 100%;">
            <b-input-group >
              <b-form-input v-model="newFavTitle" placeholder="Ihr Favorit" size="" required type="text" />
              <b-input-group-append>
                <b-btn type="submit" variant="secondary" size="">Ok</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </b-navbar>

      </b-tab>

      <!-- ****** EINKÄUFE ******* -->
      <b-tab title="Einkäufe">
        <!-- Item liste -->
        <div v-if="itemloading" align="center" style="width:100%;">
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

        <b-navbar toggleable="false" type="light" variant="info" fixed="bottom"
          v-hammer:swipe.left="onSwipeLeft"
          v-hammer:swipe.right="onSwipeRight">
          <b-nav-form @submit="addNewItem" style="width: 100%;">
            <b-input-group >
              <b-form-input v-model="newItemTitle" placeholder="Was musst du kaufen?" size="" required type="text" />
              <b-input-group-append>
                <b-btn type="submit" variant="secondary" size="">Ok</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </b-navbar>

      </b-tab>

    </b-tabs>


    <!-- New item input field -->


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

  let itemRef = db.ref('items');
  let favRef = db.ref('favorites');

  export default {
    name: 'App',
    firebase: {
      items: {
        source: itemRef,
        readyCallback: function(){
          this.itemloading = false;
        }
      },
      favorites : {
        source: favRef,
        readyCallback: function(){
          this.refloading = false;
        }
      }
    },
    data: function(){
      return {
        itemloading : true,
        refloading : true,
        title: 'Dringende Einkäufe',
        newItemTitle: '',
        newFavTitle: '',
        numberOfTabs: 2,
        tabIndex : 1  //intial showed tab (index)
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
      addNewFav: function(evt){
        evt.preventDefault();
        favRef.push({title: this.newFavTitle});
        this.newFavTitle = '';
      },
      removeFav: function(fav){
        favRef.child(fav['.key']).remove();
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
      },
      onFavoriteClicked: function (fav){
        let newItem = {title: fav.title, favId: fav['.key']};
        itemRef.push(newItem);
      },
      isFavInitems: function (fav){
        for (var i = 0, len = this.items.length; i < len; i++) {
        if (this.items[i].favId === fav['.key'])
            return true; // Return as soon as the object is found
        }
        return false; // The object was not found
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

  .isUsed{
    background-color: #e7e6e6;
    color: white;
  }

  body{
    height: 100%;
  }

</style>
