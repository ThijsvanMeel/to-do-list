<script setup>
/* eslint-disable */
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const naam = ref('')

const invoertodo = ref('')
const catogorie = ref(null)

const todos_asc = computed(() => todos.value.sort((a,b) =>{
	return a.createdAt - b.createdAt
}))

watch(naam, (newVal) => {
	localStorage.setItem('naam', newVal)
})

watch(todos, (newVal) => {
	localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
	if (invoertodo.value.trim() === '' || catogorie.value === null) {
		return
	}

	todos.value.push({
		content: invoertodo.value,
		category: catogorie.value,
		done: false,
		editable: false,
		createdAt: new Date().getTime()
	})
}

const removeTodo = (todo) => {
	todos.value = todos.value.filter((t) => t !== todo)
}

onMounted(() => {
	naam.value = localStorage.getItem('naam') || ''
	todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
</script>

<template>
	<main class="app">
		
		<section class="greeting">
			<h2 class="title">
				TO-DO-LIST
			</h2>
		</section>

		<section class="todo-aanmaken">
			<h3>*Maak je todo aan:</h3>

				<div class="options">

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category1" 
							value="school"
							v-model="catogorie" />
						<span class="bubble business"></span>
						<div>School</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category2" 
							value="werk"
							v-model="catogorie" />
						<span class="bubble personal"></span>
						<div>Werk</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category3" 
							value="Persoonlijk"
							v-model="catogorie" />
						<span class="bubble business"></span>
						<div>Persoonlijk</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category4" 
							value="overig"
							v-model="catogorie" />
						<span class="bubble business"></span>
						<div>Overig</div>
					</label>

				</div>


			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>* Wat wil je gaan doen?</h4>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="bijv. huiswerk afmaken"
					v-model="invoertodo" />
				
				<input type="submit" value="Voeg toe" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :key="todo.id" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${
							todo.category == 'business' 
								? 'business' 
								: 'personal'
						}`"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.content" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
				</div>

			</div>
		</section>

	</main>
</template>