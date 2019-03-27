<template>
  <div>
    <v-toolbar id="navToolbar" class="light-green">
      <pers-item-input v-on:persitemadded="addPersItem"></pers-item-input>
    </v-toolbar>
    <pers-item-list :items="persItems" @removepersitem="removePersItem"></pers-item-list>
  </div>
</template>

<script>
import PersItemInput from "./PersItemInput";
import PersItemList from "./PersItemList";

export default {
  name: "PersItems",
  props: {},
  components: {
    PersItemInput,
    PersItemList
  },
  data() {
    return {
      persItems: []
    };
  },
  methods: {
    addPersItem(newPersItemTitle) {
      // ensure they actually typed something
      if (!newPersItemTitle) {
        return;
      }

      this.persItems.push(newPersItemTitle);
      this.savePersItems();
    },
    removePersItem(x) {
      this.persItems.splice(x, 1);
      this.savePersItems();
    },
    savePersItems() {
      const parsed = JSON.stringify(this.persItems);
      localStorage.setItem("persItems", parsed);
    }
  },
  mounted: function() {
    if (localStorage.getItem("persItems")) {
      try {
        this.persItems = JSON.parse(localStorage.getItem("persItems"));
      } catch (e) {
        localStorage.removeItem("persItems");
      }
    }
  }
};
</script>
