<template>
    <div class="achtergrond">
      
      <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src="../assets/logotodolist.png" height="200">
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>

      
      <b><h1>TODOLIST✔</h1></b>
        <router-link :to="{name: 'Create' }" class="button mooieknop is-succes mt-5">Add Todo</router-link>
        <input class="zoekbalk" placeholder="zoek je todo" v-model="searchText">

    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <th class="has-text-centered">Todo naam</th>
        <th class="has-text-centered">categorie</th>
        <th class="has-text-centered">aanpassen</th>
        <tbody>
            <tr v-for="item in filteredItems" :key="item.todo_id">
                <td>
                    {{ item.todo_naam }}
                </td>
                <td>{{ item.todo_catogorie }}</td>
                <td class="has-text-centered">
                  <router-link 
                  :to="{name:'Edit', params: { id: item.todo_id }}"
                  class="button is-info is-small">✏️</router-link>
                  <a class="button is-danger is-small" @click="deleteTodo(item.todo_id)">🗑️</a>
                  
                </td>
                
            </tr>
        </tbody>
    </table>
    <div class="hoi">
    </div>
</div>
</template>

<script>
import Afbeelding from "../assets/logotodolist.png"
import axios from "axios";
import { assertExpressionStatement } from '@babel/types';

export default {
  data() {
    return {
      items: [],
      searchText: "",

    };
  },
  created() {
    this.getTodos();
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
  },
};


</script>

<style>
  @import url(../css/opmaak.css);
</style>