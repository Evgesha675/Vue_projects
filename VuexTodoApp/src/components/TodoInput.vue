<template>
  <div class="todo-input">
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Добавить новую задачу..."
        class="todo-input-field"
      >
      <button type="submit" class="add-btn" :disabled="!newTodo.trim()">
        ➕ Добавить
      </button>
    </form>
    <button @click="loadFromAPI" class="api-btn">
      🌐 Загрузить из API (демо)
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoInput',
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    ...mapActions(['addTodo', 'loadTodosFromAPI']),
    
    addTodo() {
      if (this.newTodo.trim()) {
        // Вызываем action из Vuex
        this.$store.dispatch('addTodo', this.newTodo)
        this.newTodo = ''
      }
    },
    
    loadFromAPI() {
      // Пример асинхронного action
      this.$store.dispatch('loadTodosFromAPI')
    }
  }
}
</script>

<style scoped>
.todo-input {
  margin-bottom: 20px;
}

form {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.todo-input-field {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.todo-input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.add-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.api-btn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.api-btn:hover {
  background: #218838;
}
</style> 