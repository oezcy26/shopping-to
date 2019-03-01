<template>
  <v-layout justify-center fluid>
    <v-flex grow>
      <v-form @submit="addPersItem">
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
      <v-btn @click="$emit('persitemadded', newPersItemTitle)" fab small color="lime">
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
      this.$emit = ("persitemadded", this.newPersItemTitle);
      this.newPersItemTitle = "";
    }
  }
};
</script>
