<template>
  <div id="app">
    <v-app >
      <v-navigation-drawer app>
        <v-toolbar class="light-green" >
          <!-- FAB and dialog -->
          <v-btn fab small color="lime"
             center right absolute
             @click="newFavDialog = !newFavDialog">
             <v-icon>add</v-icon>
          </v-btn>
          <v-dialog v-model="newFavDialog" max-width="500px">
          <v-card>
            <v-card-text>
                <v-text-field label="Favorit" v-model="newFavTitle"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click.native="addNewFav">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- FAVORITES TITLE -->
        <v-list >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>
                <span class="white--text">Favoriten</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </v-toolbar>
      <!-- FAVORITES -->
        <v-list>
          <template v-for="f in favorites" >
            <!-- clickable -->
            <v-list-tile v-if="!isFavInitems(f)" @click="onFavoriteClicked(f)" :key=f>
              <v-list-tile-content>
                <v-list-tile-title v-text="f.title" class="title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click.stop="removeFav(f)">
                  <v-icon color="red lighten-3">delete_forever</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider class="noMargin" :key=f></v-divider>
            <!-- NOT clickable -->
            <v-list-tile v-if="isFavInitems(f)" disabled :key=f>
              <v-list-tile-content>
                <v-list-tile-title v-text="f.title" class="title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider style="margin-top:0px; margin-bottom:0px;" :key=f></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>

      <!-- EINKÄUFE -->
      <v-toolbar app class="lime">Einkäufe</v-toolbar>

      <v-content>
        <v-container fluid style="padding:0 0;">
            <div v-if="itemloading" align="center" style="width:100%;">
              <loading-spinner ></loading-spinner>
            </div>

            <div v-else>
              <v-list v-if="items.length > 0">
                <template v-for="i in items">
                  <v-list-tile :key=i>
                    <v-list-tile-content>
                      <v-list-tile-subtitle v-text="i.title" class="title"></v-list-tile-subtitle>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn @click="removeItem(i)" fab small dark outline color="green">
                        <v-icon >done</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider class="noMargin" :key=i></v-divider>
                </template>
              </v-list>
            </div>
        </v-container>
      </v-content>


      <v-footer app height="auto" inset>
        <v-layout justify-center fluid>
          <v-flex grow>
            <v-form @submit="addNewItem">
              <v-text-field v-model="newItemTitle" placeholder="Was musst du kaufen?" size="" required type="text" />
            </v-form>
          </v-flex>
          <v-flex shrink>
            <v-btn @click="addNewItem" color="lime" fab    >OK</v-btn>
          </v-flex>
       </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

  import LazySmiley from './components/LazySmiley'
  import LoadingSpinner from './components/LoadingSpinner'
  import Firebase from 'firebase'
  import firebaseConfig from './firebaseConfig'

  /* IMPORTANT!: To make it run, create a file in this directory: 'firebaseConfig.js'
  with this content:

  let firebaseConfig;
  export default firebaseConfig = {
    -- HERE THE CONFIG OBJECT FROM FIREBASE COMES IN --
    apiKey: ....,
    authDomain: ....,
    databaseURL: ....,
    projectId: ....,
    storageBucket: .....,
    messagingSenderId: ......
  }


  */


  let app = Firebase.initializeApp(firebaseConfig);
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
        newFavDialog : false
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
        this.newFavDialog = false;
      },
      removeFav: function(fav){
        favRef.child(fav['.key']).remove();
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

  .noMargin{
    margin-top:0px;
    margin-bottom:0px;
  }

</style>
