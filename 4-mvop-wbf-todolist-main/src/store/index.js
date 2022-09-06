import Vue from 'vue'
import Vuex from 'vuex'

// TODO: is this good practice?
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmlnaW5hbCI6MCwiaWQiOjEsImlhdCI6MTY1MjAxMzc4M30.MsBNDAEjAQ5gNSNmE1VPHh0InxqaQaIHRGIxDENHCLQ";
const api = "https://morsmordre.cajthaml.eu/";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    setLists(state, lists) {
      state.lists = lists;
    },
    addList(state, list) {
      if (state.lists.find(l => l.id === list.id)) {
        state.lists = state.lists.map(l => {
          if (l.id === list.id) return list;

          return l;
        });

        return;
      }

      state.lists.push(list);
    }
  },
  actions: {
    async getLists({ commit }) {
      const response = await fetch(api + "list", {
        headers: {
          "X-Token": token
        }
      });
      const responseData = await response.json();
      commit('setLists', responseData.data.lists);
    },
    async addList({ commit }, name) {
      const response = await fetch(api + "list", {
        method: "POST",
        headers: {
          "X-Token": token,
          "content-type": "application/json"
        },
        body: JSON.stringify({ name: name })
      });
      // TODO: check was successful
    },
    async getList({ commit }, id) {
      const response = await fetch(api + "list/" + id, {
        method: "GET",
        headers: {
          "X-Token": token,
        },
      });
      const responseData = await response.json();
      commit('addList', responseData.data);
      // TODO: check was successful
    },

    async newTask({ commit }, { data: data, id: id }) {
      const response = await fetch(api + "list/" + id + "/task", {
        method: "POST",
        headers: {
          "X-Token": token,
          "content-type": "application/json"
        },
        body: JSON.stringify({ name: data })
      });
      return response;
    }
  },
  modules: {
  }
})
