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
    <button class="button is-success" @click="updateTodo">OPSLAAN</button>
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
    //todo ophalen id
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

    //update todo
    async updateTodo() {
      try {
        await axios.put(
          `http://localhost:5000/todos/${this.$route.params.id}`,
          {
            todo_naam: this.todonaam,
            todo_catogorie: this.todocatogorie,
          }
        );
        (this.productName = ""), (this.todocatogorie = "");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
  