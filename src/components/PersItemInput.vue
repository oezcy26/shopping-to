<template>
  <v-layout justify-center fluid>
    <v-flex grow>
      <v-text-field
        v-model="newPersItemTitle"
        placeholder="Was musst du kaufen?"
        size
        required
        type="text"
        @keydown.enter="addPersItem"
      />
    </v-flex>
    <v-flex shrink>
      <v-btn @click="addPersItem" fab small color="lime">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "PersItemInput",
  data() {
    return {
      newPersItemTitle: ""
    };
  },
  methods: {
    addPersItem: function() {
      let commit = this.newPersItemTitle;
      this.$emit("persitemadded", commit);
      this.newPersItemTitle = "";
    }
  }
};
</script>
