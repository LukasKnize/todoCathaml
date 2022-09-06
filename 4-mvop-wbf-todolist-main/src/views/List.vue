<template>
  <v-container>
    <v-card v-if="loaded">
      <v-card-title> List {{ list.name }} </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="task in list.tasks" :key="task.id">
            <v-list-item-action>
              <v-checkbox :input-value="task.completed"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ task.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-title> New task </v-card-title>
      <v-form ref="form" @submit.prevent="submit">
        <v-container fluid class="mb-5">
          <v-text-field :rules="rules" counter="128" v-model="taskText"></v-text-field>
        </v-container>
        <v-card-actions>
          <v-btn
            :loading="SubmitLoading1"
            :disabled="SubmitLoading1"
            color="primary"
            class="ma-2 white--text"
            absolute
            right
            fab
            @click="loader = 'SubmitLoading1'; submit()">
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "List",

  data() {
    return {
      taskText: "",
      loaded: false,
      loader: null,
      SubmitLoading1: false,
      hasResponse: false,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 128 || "Max 128 characters",
      ],
    };
  },

  computed: {
    list() {
      return this.$store.state.lists.find((l) => l.id == this.$route.params.id);
    },
  },

  async mounted() {
    const listId = this.$route.params.id;

    await this.$store.dispatch("getList", listId);
    this.loaded = true;
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.loader = null;
    },
  },
  methods: {
    async submit(){
      let response = await this.$store.dispatch("newTask", {data: this.taskText, id: this.$route.params.id});
      if (response.status == 200) {
        this.taskText = ""
        this.SubmitLoading1 = false
      }else{
        
      }
      
    }
  },
};
</script>


<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>