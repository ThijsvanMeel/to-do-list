<template>
  <router-link to="/" class="back-button">
      <span class="back-arrow">&lt;</span>
    </router-link>
  <img class="header" src="../assets/header.png">
  <div class="inputfields">
    <div class="card geenfullwidth">
      <div class="card-content">
        <h2 class="voegtodotoe">Bewerk je todo</h2>
        <div class="field">
          <label class="label">Todo</label>
          <div class="control">
            <input
              class="inputedit"
              type="text"
              placeholder="Vul hier in wat je wilt doen"
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
              placeholder="Onder welke categorie?"
              v-model="todocatogorie"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="control">
      <button class="button mooieknop2" @click="updateTodo">OPSLAAN</button>
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
  created() {
    this.getTodoById();
  },
  methods: {
    async getTodoById() {
      try {
        const response = await axios.get(
          `http://localhost:5000/todos/${this.$route.params.id}`
        );
        this.todonaam = response.data.todo_naam;
        this.todocatogorie = response.data.todo_catogorie;
      } catch (err) {
        console.log(err);
      }
    },
    async updateTodo() {
      try {
        await axios.put(
          `http://localhost:5000/todos/${this.$route.params.id}`,
          {
            todo_naam: this.todonaam,
            todo_catogorie: this.todocatogorie,
          }
        );
        this.todonaam = "";
        this.todocatogorie = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
  @import url(../css/opmaak.css);
</style>
  