import { createStore } from 'vuex'

// Состояние приложения
const state = {
  todos: [
    { id: 1, text: 'Изучить Vue.js', completed: true },
    { id: 2, text: 'Освоить Vuex', completed: false },
    { id: 3, text: 'Создать крутое приложение', completed: false }
  ],
  filter: 'all', // all, active, completed
  nextId: 4
}

// Мутации - единственный способ изменить состояние
const mutations = {
  ADD_TODO(state, todoText) {
    state.todos.push({
      id: state.nextId++,
      text: todoText,
      completed: false
    })
  },
  
  TOGGLE_TODO(state, todoId) {
    const todo = state.todos.find(todo => todo.id === todoId)
    if (todo) {
      todo.completed = !todo.completed
    }
  },
  
  DELETE_TODO(state, todoId) {
    const index = state.todos.findIndex(todo => todo.id === todoId)
    if (index > -1) {
      state.todos.splice(index, 1)
    }
  },
  
  EDIT_TODO(state, { id, text }) {
    const todo = state.todos.find(todo => todo.id === id)
    if (todo) {
      todo.text = text
    }
  },
  
  SET_FILTER(state, filter) {
    state.filter = filter
  },
  
  CLEAR_COMPLETED(state) {
    state.todos = state.todos.filter(todo => !todo.completed)
  }
}

// Действия - для асинхронных операций
const actions = {
  addTodo({ commit }, todoText) {
    if (todoText.trim()) {
      commit('ADD_TODO', todoText.trim())
    }
  },
  
  toggleTodo({ commit }, todoId) {
    commit('TOGGLE_TODO', todoId)
  },
  
  deleteTodo({ commit }, todoId) {
    commit('DELETE_TODO', todoId)
  },
  
  editTodo({ commit }, payload) {
    commit('EDIT_TODO', payload)
  },
  
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter)
  },
  
  clearCompleted({ commit }) {
    commit('CLEAR_COMPLETED')
  },
  
  // Пример асинхронного действия
  async loadTodosFromAPI({ commit }) {
    try {
      // Имитация API вызова
      await new Promise(resolve => setTimeout(resolve, 1000))
      const todos = [
        { id: 1, text: 'Todo из API', completed: false }
      ]
      // Здесь можно добавить мутацию для загрузки todos
      console.log('Todos загружены:', todos)
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    }
  }
}

// Геттеры - вычисляемые свойства для состояния
const getters = {
  allTodos: state => state.todos,
  
  activeTodos: state => state.todos.filter(todo => !todo.completed),
  
  completedTodos: state => state.todos.filter(todo => todo.completed),
  
  filteredTodos: (state, getters) => {
    switch (state.filter) {
      case 'active':
        return getters.activeTodos
      case 'completed':
        return getters.completedTodos
      default:
        return getters.allTodos
    }
  },
  
  todosCount: state => state.todos.length,
  
  activeCount: (state, getters) => getters.activeTodos.length,
  
  completedCount: (state, getters) => getters.completedTodos.length,
  
  currentFilter: state => state.filter
}

export default createStore({
  state,
  mutations,
  actions,
  getters
}) 