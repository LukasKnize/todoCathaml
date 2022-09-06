<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" sm="6" v-for="list in lists" v-bind:key="list.id">
        <v-card elevation="3" rounded :to="{ name: 'List', params: { id: list.id }}">
          <v-card-title>{{list.name}}</v-card-title>

        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="6">
        <v-sheet color="white" elevation="3" class="pa-3" rounded>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <div class="d-flex justify-center align-center">
                <v-btn
                  color="primary"
                  dark
                  icon
                  x-large
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </div>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Přidání listu</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    label="Jméno"
                    required
                    v-model="name"
                  ></v-text-field>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="gray darken-1" text @click="close()">
                  Zavřít
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()">
                  Uložit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },

  data() {
    return {
      dialog: false,
      name: "",
    };
  },

  methods: {
    close() {
      this.dialog = false;
      this.name = "";
    },
    async save() {
      this.dialog = false;
      await this.$store.dispatch("addList", this.name);
      await this.$store.dispatch("getLists");
      this.name = "";
    },
  },
};
</script>
