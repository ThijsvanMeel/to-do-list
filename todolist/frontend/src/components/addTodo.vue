<template>
  <router-link to="/" class="back-button">
      <span class="back-arrow">&lt;</span>
    </router-link>
  <img class="header" src="../assets/header.png">
  <div class="inputfields">
    <div class="card geenfullwidth">
      <div class="card-content">
        <h2 class="voegtodotoe">maak todo aan</h2>
        <div class="field">
          <label class="label">Todo</label>
          <div class="control">
            <input
              class="inputedit"
              type="text"
              placeholder="Wat ga je doen?"
              v-model="todonaam"
            />
          </div>
        </div>

        <div class="field field2">
          <label class="label">Todo categorie</label>
          <div class="control">
            <input
              class="inputedit"
              type="text"
              placeholder="welke categorie?"
              v-model="todocatogorie"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="control">
      <button class="button mooieknop2" @click="saveTodo">OPSLAAN</button>
    </div>
  </div>
</template>
  
  <script>
  
  import axios from "axios";
  export default {
  data() {
    return {
      todonaam: "",
      todocatogorie: "",
    };
  },
  methods: {
    //todo aanmaken
    async saveTodo() {
      try {
        await axios.post("http://localhost:5000/todos", {
          todo_naam: this.todonaam,
          todo_catogorie: this.todocatogorie,
        });
        (this.todonaam = ""), (this.todocatogorie = "");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
  </script>
  
  <style></style>
  