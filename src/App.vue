<template>
  <div id="app">
    <v-app>
      <!-- Personal Items (Local Storage) -->
      <v-navigation-drawer app v-model="drawer">
        <pers-items></pers-items>
      </v-navigation-drawer>

      <!-- EINKÄUFE -->
      <v-toolbar app class="lime">
        <span>
          <b>Einkäufe</b>
        </span>
        <v-spacer/>
        <!--
        <v-btn icon @click="sort_alpha()">
          <v-icon>sort_by_alpha</v-icon>
        </v-btn>       
        <v-spacer/>
        -->
        <span>
          <b>({{this.$store.state.persItems.length}})</b>
        </span>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      </v-toolbar>

      <v-content>
        <v-container fluid style="padding:0 0;">
          <div v-if="itemloading" align="center" style="width:100%;">
            <loading-spinner></loading-spinner>
          </div>

          <div v-else>
            <v-list v-if="items.length > 0">
              <template v-for="i in orderBy(filterBy(items, 'false', 'bought') ,sortKey) ">
                <v-list-tile>
                  <v-list-tile-content @click="toggleBought(i)">
                    <span class="title" v-bind:class="{bought : i.bought}">{{i.title}}</span>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="removeItem(i)" fab small dark outline color="green">
                      <v-icon>done</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider class="noMargin"></v-divider>
              </template>
            </v-list>
            <v-list v-if="items.length > 0">
              <template v-for="i in orderBy(filterBy(items, 'true', 'bought') ,sortKey) ">
                <v-list-tile>
                  <v-list-tile-content @click="toggleBought(i)">
                    <span class="title" v-bind:class="{bought : i.bought}">{{i.title}}</span>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="removeItem(i)" fab small dark outline color="green">
                      <v-icon>done</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider class="noMargin"></v-divider>
              </template>
            </v-list>
          </div>
        </v-container>
      </v-content>

      <v-footer app height="auto" inset>
        <v-layout justify-center fluid>
          <v-flex grow>
            <v-form @submit="addNewItem">
              <v-text-field
                v-model="newItemTitle"
                placeholder="Was musst du kaufen?"
                size
                required
                type="text"
                @focus="addDialog = true"
              />
            </v-form>
          </v-flex>
          <v-flex shrink>
            <v-btn @click="addDialog = true" color="lime" fab>OK</v-btn>
            <!-- DIALOG -->
            <v-dialog v-model="addDialog">
              <v-card>
                <v-card-text>Auswahl Migros, Coop etc..</v-card-text>
                <v-card-title>
                  <v-layout fluid>
                    <v-flex grow>
                      <v-form @submit="addNewItem">
                        <v-text-field
                          v-if="addDialog"
                          v-model="newItemTitle"
                          placeholder="Was musst du kaufen?"
                          size
                          required
                          type="text"
                          autofocus
                        />
                        <!-- v-if=addDialog damit autofocus funktionniert ;-) -->
                      </v-form>
                    </v-flex>
                    <v-flex shrink>
                      <v-btn @click="addNewItem" color="lime" fab>OK</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-dialog>
            <!-- /DIALOG -->
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import LazySmiley from "./components/LazySmiley";
import LoadingSpinner from "./components/LoadingSpinner";
import PersItems from "./components/PersItems";

import Firebase from "firebase";

import firebaseConfig from "./firebaseConfig";
import Vue2Filters from "vue2-filters";
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

let itemRef = db.ref("items");
let favRef = db.ref("favorites");

export default {
  name: "App",
  firebase: {
    items: {
      source: itemRef,
      readyCallback: function() {
        this.itemloading = false;
      }
    }
  },
  components: {
    LazySmiley,
    LoadingSpinner,
    PersItems
  },
  data: function() {
    return {
      itemloading: true,
      refloading: true,
      newItemTitle: null,
      drawer: null, // drawer open or close
      addDialog: false,
      sortKey: "title"
    };
  },

  methods: {
    test: function() {
      alert("test");
    },
    addNewItem: function(evt) {
      evt.preventDefault();
      itemRef.push({ title: this.newItemTitle, bought: false });
      this.newItemTitle = "";
      this.addDialog = false;
    },
    removeItem: function(item) {
      itemRef.child(item[".key"]).remove();
    },
    toggleBought: function(item) {
      if (item.title) {
        item.bought = !item.bought;
        itemRef.child(item[".key"]).update({ bought: item.bought });
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>

<style>
/* @import 'debug.css'; */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  padding-bottom: 70px;
}

.siteHeader {
  padding: 20px 10px;
  background-color: #c6c6f5; /* light blue */
}

body {
  height: 100%;
}

.noMargin {
  margin-top: 0px;
  margin-bottom: 0px;
}

#navToolbar div {
  padding-right: 0px;
}

.bought {
  color: #cfcfcf;
  text-decoration: line-through;
}
</style>
