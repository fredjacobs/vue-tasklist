<template>
  <v-container>
    <add-new-task />
  </v-container>
</template>

<script>
import AddNewTask from "../components/AddNewTask";

export default {
  name: "Home",

  components: {
    AddNewTask,
  },
};
</script>
