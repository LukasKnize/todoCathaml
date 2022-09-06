<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <v-icon x-large class="mr-3">mdi-format-list-checks</v-icon>
        <span>MVOP WBF Todo list</span>
      </v-toolbar-title>


      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main v-if="loaded">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    loaded: false
  }),

  async created() {
    await this.$store.dispatch('getLists');
    this.loaded = true;
  }
};
</script>
