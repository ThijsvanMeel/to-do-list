<template>
    <div class="achtergrond">
        <router-link :to="{name: 'Create' }" class="button is-succes mt-5">Add Todo</router-link>
    <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <th class="has-text-centered">Todo naam</th>
        <th class="has-text-centered">categorie</th>
        <th class="has-text-centered">aanpassen</th>
        <tbody>
            <tr v-for="item in items" :key="item.todo_id">
                <td>
                    {{ item.todo_naam }}
                </td>
                <td>{{ item.todo_catogorie }}</td>
                <td class="has-text-centered">
                  <router-link 
                  :to="{name:'Edit', params: { id: item.todo_id }}"
                  class="button is-info is-small">Edit</router-link>
                  <a class="button is-danger is-small" @click="deleteTodo(item.todo_id)">Verwijderen</a>
                  
                </td>
                
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

import axios from "axios";
import { assertExpressionStatement } from '@babel/types';

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getTodos();
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