<template>
  <div class="todo-filters">
    <h3>🔍 Фильтры</h3>
    <div class="filter-buttons">
      <button
        @click="setFilter('all')"
        class="filter-btn"
        :class="{ active: currentFilter === 'all' }"
      >
        📋 Все ({{ todosCount }})
      </button>
      
      <button
        @click="setFilter('active')"
        class="filter-btn"
        :class="{ active: currentFilter === 'active' }"
      >
        ⏳ Активные ({{ activeCount }})
      </button>
      
      <button
        @click="setFilter('completed')"
        class="filter-btn"
        :class="{ active: currentFilter === 'completed' }"
      >
        ✅ Завершенные ({{ completedCount }})
      </button>
    </div>
    
    <div class="filter-info">
      <p><strong>Активный фильтр:</strong> {{ activeFilterName }}</p>
      <p class="hint">💡 Дважды кликните по задаче, чтобы редактировать её</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoFilters',
  computed: {
    ...mapGetters(['currentFilter', 'todosCount', 'activeCount', 'completedCount']),
    
    activeFilterName() {
      switch (this.currentFilter) {
        case 'all': return 'Все задачи'
        case 'active': return 'Активные задачи'
        case 'completed': return 'Завершенные задачи'
        default: return 'Неизвестный фильтр'
      }
    }
  },
  methods: {
    ...mapActions(['setFilter'])
  }
}
</script>

<style scoped>
.todo-filters {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.todo-filters h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 16px;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #667eea;
  transform: translateY(-1px);
}

.filter-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
}

.filter-info {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.filter-info p {
  margin: 8px 0;
  font-size: 14px;
}

.hint {
  color: #666;
  font-style: italic;
}
</style> 