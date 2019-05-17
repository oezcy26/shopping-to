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
        <v-btn icon>
          <v-icon>sort_by_alpha</v-icon>
        </v-btn>
        
        <v-overflow-btn
          :items="['','Coop', 'Migros']"
          label
          hide-details
          class="pa-0"
          v-model="overflowBtn"
        ></v-overflow-btn>
        -->

        <v-spacer/>

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
                  <v-list-tile-content>
                    <span class="title" v-bind:class="{bought : i.bought}">{{i.title}}</span>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="toggleBought(i)" fab small dark outline color="green">
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
                  <v-list-tile-content @click.prevent.stop="handleClick($event, i)">
                    <span class="title bought">{{i.title}}</span>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn @click="toggleBought(i)" fab small dark outline color="#d3d3d3">
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

      <vue-simple-context-menu
        :elementId="'myUniqueId'"
        :options="[{name:'Löschen'}]"
        :ref="'vueSimpleContextMenu'"
        @option-clicked="optionClicked"
      ></vue-simple-context-menu>

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
                <!--
                <v-card-text>
                  <v-btn-toggle v-model="newItemShop">
                    <v-btn flat value="Lidl">
                      <b>L</b>idl
                    </v-btn>
                    <v-btn flat value="Coop">
                      <b>C</b>oop
                    </v-btn>
                    <v-btn flat value="Migros">
                      <b>M</b>igros
                    </v-btn>
                    <v-btn flat value="Denner">
                      <b>D</b>enner
                    </v-btn>
                    <v-btn flat value="Türk">
                      <b>T</b>ürk
                    </v-btn>
                  </v-btn-toggle>
                </v-card-text>
                -->
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
import VueSimpleContextMenu from "vue-simple-context-menu";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";

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
    PersItems,
    VueSimpleContextMenu
  },
  data: function() {
    return {
      itemloading: true,
      refloading: true,
      newItemTitle: null,
      newItemShop: null,
      drawer: null, // drawer open or close
      addDialog: false,
      sortKey: "title",
      overflowBtn: null
    };
  },
  methods: {
    test: function() {
      alert("test");
    },
    addNewItem: function(evt) {
      evt.preventDefault();
      itemRef.push({
        title: this.newItemTitle,
        bought: false,
        shop: this.newItemShop
      });
      this.newItemTitle = "";
      this.newItemShop = null;
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
    },
    optionClicked: function(event) {
      this.removeItem(event.item);
    },
    handleClick: function($event, item) {
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
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
