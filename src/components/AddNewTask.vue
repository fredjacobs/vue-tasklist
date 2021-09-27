<template>
  <v-container>
    <h1>{{ title }}</h1>
    <v-row>
      <v-col>
        <v-card class="pa-6 mx-4" color="" elevation="20">
          <div
            class="taskContainer"
            v-for="task in $store.state.tasks"
            :key="task.id"
            :data-taskId="task.id"
            data-say="Hello"
          >
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  :elevation="hover ? 24 : 6"
                  @click="selectTask"
                  class="pa-4 my-2"
                  :class="{ border__important: task.important }"
                >
                  <p>
                    <span
                      ><v-btn class="hide" :class="{ show__edit: hover }"
                        >EDIT</v-btn
                      >
                    </span>
                    <span
                      ><v-btn
                        class="hide"
                        :class="{ show__edit: hover }"
                        @click="deleteTask"
                        >DONE</v-btn
                      >
                    </span>
                  </p>
                  <p>{{ task.content }}</p>

                  <small>{{ task.date }}</small>
                </v-card>
              </template>
            </v-hover>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-6 ml-auto">
          <v-btn @click="addTask">Add Task</v-btn>
          <v-form>
            <v-text-field label="New Task" v-model="content"></v-text-field>
            <v-checkbox label="Important" v-model="important"></v-checkbox>
            <v-date-picker no-title v-model="date"></v-date-picker>

            <!--#######################################-->
          </v-form>
        </v-card>
      </v-col>
    </v-row>
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
    //tasks: [],
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
      this.content = "";
      this.important = false;
    },
    deleteTask(e) {
      const id = e.target.closest(".taskContainer").dataset.taskid;
      this.$store.dispatch("deleteTask", id);
    },
  },
};
</script>

<style scoped>
.border__important {
  border-right: 5px solid green;
}
.hide {
  display: none;
}
.show__edit {
  display: inline;
}
</style>
