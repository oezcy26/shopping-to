<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app>
        <v-toolbar id="navToolbar" class="light-green">
          <!-- FAVORITES TITLE -->
          <v-layout justify-center fluid>
            <v-flex grow>
              <v-form @submit="addNewPersItem">
                <v-text-field
                  v-model="newPersItemTitle"
                  placeholder="Was musst du kaufen?"
                  size
                  required
                  type="text"
                />
              </v-form>
            </v-flex>
            <v-flex shrink>
              <v-btn @click="addNewPersItem" fab small color="lime">
                <v-icon>add</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-toolbar>
        <!-- FAVORITES -->
        <v-list>
          <template v-for="f in personalItems">
            <!-- clickable -->
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title v-text="f" class="title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn fab small dark outline color="green">
                  <v-icon>done</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider class="noMargin"></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>

      <!-- EINKÄUFE -->
      <v-toolbar app class="lime">
        <span>
          <b>Gemeinsame</b> Liste
        </span>
      </v-toolbar>

      <v-content>
        <v-container fluid style="padding:0 0;">
          <div v-if="itemloading" align="center" style="width:100%;">
            <loading-spinner></loading-spinner>
          </div>

          <div v-else>
            <v-list v-if="items.length > 0">
              <template v-for="i in items">
                <v-list-tile>
                  <v-list-tile-content>
                    <span class="title">{{i.title}}</span>
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
              />
            </v-form>
          </v-flex>
          <v-flex shrink>
            <v-btn @click="addNewItem" color="lime" fab>OK</v-btn>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import LazySmiley from "./components/LazySmiley";
import LoadingSpinner from "./components/LoadingSpinner";
import Firebase from "firebase";

import firebaseConfig from "./firebaseConfig";
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
  data: function() {
    return {
      itemloading: true,
      refloading: true,
      newItemTitle: "",
      newPersItemTitle: ""
    };
  },
  computed: {
    personalItems: function() {
      let pItems = localStorage.getItem("personalItems");
      return pItems;
    }
  },
  mounted: function() {},
  components: {
    LazySmiley,
    LoadingSpinner
  },
  methods: {
    test: function() {
      alert("test");
    },
    addNewItem: function(evt) {
      evt.preventDefault();
      itemRef.push({ title: this.newItemTitle });
      this.newItemTitle = "";
    },
    removeItem: function(item) {
      itemRef.child(item[".key"]).remove();
    },
    addNewPersItem: function() {}
  }
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
</style>
