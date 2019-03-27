<template>
  <v-list>
    <template v-for="(pi,idx) in items">
      <!-- clickable -->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-text="pi" class="title"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn fab small dark outline color="green" @click="$emit('removepersitem', idx)">
            <v-icon>done</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider class="noMargin"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "PersItemList",
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
