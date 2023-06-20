<template>
  <div class="achtergrond">

    <!-- navbar -->
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item is-tab">Home</router-link>
          <router-link to="/about" class="navbar-item is-tab">calender</router-link>
        </div>
      </div>
    </nav>

    <!-- tijd en datum -->
    <b><h1>Vandaag</h1></b>
    <p class="datumentijd">{{ currentDateTime }}</p>

    <!-- zoekbalk -->
    <input class="zoekbalk" placeholder="🔍︎ Zoek" v-model="searchText">

    <!-- de todo's -->
    <div class="columns is-multiline is-centered">
      <div v-for="item in filteredItems" :key="item.todo_id" class="column is-one-third">
        <div class="card column is-half is-offset-one-quarter" :class="{ 'completed': item.completed }">
          <div class="card-content">
            <p class="title">{{ item.todo_naam }}</p>
            <p class="subtitle">{{ item.todo_catogorie }}</p>
          </div>
          <footer class="card-footer">
            <router-link :to="{name:'Edit', params: { id: item.todo_id }}" class="card-footer-item has-text-info">✏️</router-link>
            <a class="card-footer-item has-text-danger" @click="deleteTodo(item.todo_id)">🗑️</a>
            <a class="card-footer-item" @click="toggleCompletion(item)">{{ item.completed ? '❌' : '✅' }}</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="opvulling">
      <h2 class="voegtoe">Voeg meer todo's toe</h2>
      <P class="pijltje">⬇️</P>
    </div>
    <!-- add todo knop -->
    <router-link :to="{name: 'Create' }" class="button mooieknop">+ Add Todo</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      searchText: "",
      isOpen: false,
      currentDateTime: ''
    };
  },
  
  created() {
    this.getTodos();
    this.updateDateTime();
  },
  
  computed: {
    filteredItems() {
      if (!this.searchText) {
        return this.items;
      }
      const searchTextLower = this.searchText.toLowerCase();
      return this.items.filter(
        (item) =>
          item.todo_naam.toLowerCase().includes(searchTextLower)
      );
    },
  },
  
  methods: {
    async getTodos() {
      try {
        const response = await axios.get("http://localhost:5000/todos");
        this.items = response.data;
        console.log(this.items);
      } catch (err) {
        console.log(err);
      }
    },
    
    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:5000/todos/${id}`);
        this.getTodos();
      } catch (err) {
        console.log(err);
      }
    },
    
    updateDateTime() {
      this.currentDateTime = new Date().toLocaleString();
      setTimeout(this.updateDateTime, 1000); // Werk de datum en tijd elke seconde bij
    },
    
    toggleCompletion(item) {
      item.completed = !item.completed;
    }
  },
};
</script>

<style>
  @import url(../css/opmaak.css);
</style>