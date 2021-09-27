<template>
  <v-container>
    <h1>{{ title }}</h1>
    <div class="d-flex">
      <v-card class="pa-6 mx-4" color="primary" elevation="20">
        <v-card
          v-for="task in $store.state.tasks"
          :key="task.id"
          :data-taskId="task.id"
          class="pa-4 my-2"
          @click="selectTask"
        >
          <strong>{{ task.id }}) </strong> <strong>Task:</strong>
          {{ task.content }} <strong>Date:</strong> {{ task.date }}
          <strong>Important:</strong> {{ task.important }}
        </v-card>
      </v-card>
      <v-card class="pa-6 ml-auto">
        <v-btn @click="addTask">Add Task</v-btn>
        <v-form>
          <v-text-field label="New Task" v-model="content"></v-text-field>
          <v-checkbox label="Important" v-model="important"></v-checkbox>
          <v-date-picker no-title v-model="date"></v-date-picker>

          <!--#######################################-->
        </v-form>
      </v-card>

      <!--##############################################################-->
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
          :elevation="hover ? 16 : 2"
          :class="{ 'on-hover': hover }"
          class="mx-auto"
        >
          dsfsdaf
        </v-card>
      </v-hover>
      <!--##################################################################-->
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AddNewTask",

  data: () => ({
    title: "My Task list",
    content: null,
    date: null,
    important: false,
    newTask: {},
  }),

  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },

  created() {
    this.$store.dispatch("getTasks");
  },
  methods: {
    selectTask(e) {
      console.log(e.target);
    },
    addTask() {
      const taskObj = {
        content: this.content,
        date: this.date,
        important: this.important,
      };

      this.$store.dispatch("addTask", taskObj);
    },
  },
};
</script>

<style scoped></style>
