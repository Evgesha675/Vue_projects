<template>
  <div id="app">
    <div class="container">
      <h1>📝 Todo App с Vuex</h1>
      <TodoInput />
      <TodoStats />
      <TodoList />
      <TodoFilters />
    </div>
  </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoStats from './components/TodoStats.vue'
import TodoFilters from './components/TodoFilters.vue'

export default {
  name: 'App',
  components: {
    TodoInput,
    TodoList,
    TodoStats,
    TodoFilters
  }
}
</script>

<style>
#app {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin-top: 50px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 