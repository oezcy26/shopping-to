<template>
  <div>
    <v-toolbar id="navToolbar" class="light-green">
      <pers-item-input v-on:persitemadded="addPersItem"></pers-item-input>
    </v-toolbar>
    <pers-item-list :items="this.$store.state.persItems" @removepersitem="removePersItem"></pers-item-list>
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
      this.$store.commit("addPersItem", newPersItemTitle);
    },
    removePersItem(idx) {
      this.$store.commit("removePersItem", idx);
    }
  }
};
</script>
