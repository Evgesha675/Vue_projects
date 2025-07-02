<template>
  <div class="todo-list">
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <p>{{ emptyMessage }}</p>
    </div>
    
    <transition-group name="todo" tag="div" class="todos-container">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="todo-checkbox"
        >
        
        <span
          v-if="!isEditing(todo.id)"
          @dblclick="startEdit(todo.id)"
          class="todo-text"
          :class="{ completed: todo.completed }"
        >
          {{ todo.text }}
        </span>
        
        <input
          v-else
          v-model="editText"
          @blur="finishEdit(todo.id)"
          @keyup.enter="finishEdit(todo.id)"
          @keyup.esc="cancelEdit"
          class="edit-input"
          ref="editInput"
        >
        
        <button
          @click="deleteTodo(todo.id)"
          class="delete-btn"
          title="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoList',
  data() {
    return {
      editingId: null,
      editText: ''
    }
  },
  computed: {
    ...mapGetters(['filteredTodos', 'currentFilter']),
    
    emptyMessage() {
      switch (this.currentFilter) {
        case 'active':
          return '🎉 Нет активных задач!'
        case 'completed':
          return '📝 Нет завершенных задач'
        default:
          return '📝 Список задач пуст. Добавьте новую задачу!'
      }
    }
  },
  methods: {
    ...mapActions(['toggleTodo', 'deleteTodo', 'editTodo']),
    
    isEditing(id) {
      return this.editingId === id
    },
    
    startEdit(id) {
      const todo = this.filteredTodos.find(t => t.id === id)
      this.editingId = id
      this.editText = todo.text
      
      this.$nextTick(() => {
        const input = this.$refs.editInput?.[0]
        if (input) {
          input.focus()
          input.select()
        }
      })
    },
    
    finishEdit(id) {
      if (this.editText.trim()) {
        this.editTodo({ id, text: this.editText.trim() })
      }
      this.cancelEdit()
    },
    
    cancelEdit() {
      this.editingId = null
      this.editText = ''
    }
  }
}
</script>

<style scoped>
.todo-list {
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
  font-size: 18px;
}

.todos-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.todo-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.todo-item.completed {
  opacity: 0.7;
  background: #d4edda;
}

.todo-checkbox {
  margin-right: 12px;
  transform: scale(1.2);
  cursor: pointer;
}

.todo-text {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-text:hover {
  color: #667eea;
}

.edit-input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 16px;
  background: white;
}

.edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.delete-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;
  padding: 4px;
  border-radius: 4px;
}

.delete-btn:hover {
  opacity: 1;
  background: #fff5f5;
  transform: scale(1.1);
}

/* Анимации для переходов */
.todo-enter-active, .todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.todo-move {
  transition: transform 0.3s ease;
}
</style> 