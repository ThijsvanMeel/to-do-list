<template>
    <div>
        <div class="field">
      <label class="label">Todo</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Vul hier in wat je wilt gaan doen"
          v-model="todonaam"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Todo categorie</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Onder welke categorie valt het?"
          v-model="todocatogorie"
        />
      </div>
    </div>
    <div class="control">
      <button class="button is-success" @click="saveTodo">OPSLAAN</button>
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
  