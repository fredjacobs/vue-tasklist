import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    getTasks(state, payload) {
      payload.forEach((task) => state.tasks.push(task));
      /* state.tasks.push(payload); */
    },
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    deleteTask(state, payload) {
      state.tasks.filter((task) => task.id !== payload);
    },
  },
  actions: {
    async getTasks({ commit }) {
      try {
        await axios("http://localhost:3000/tasks").then((response) =>
          commit("getTasks", response.data)
        );
      } catch (err) {
        alert(err.message);
      }
    },
    async addTask({ commit }, task) {
      try {
        await axios({
          method: "POST",
          url: "http://localhost:3000/tasks",
          data: task,
        });
        commit("addTask", task);
      } catch (err) {
        alert(err.message);
      }
    },

    async deleteTask({ commit }, id) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`);
        commit("deleteTask", id);
      } catch (err) {
        err.message;
      }
    },
  },
  modules: {},
});
