<template>
  <div class="todo-stats">
    <div class="stats-grid">
      <div class="stat-card total">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <h3>{{ todosCount }}</h3>
          <p>Всего задач</p>
        </div>
      </div>
      
      <div class="stat-card active">
        <div class="stat-icon">⏳</div>
        <div class="stat-info">
          <h3>{{ activeCount }}</h3>
          <p>Активных</p>
        </div>
      </div>
      
      <div class="stat-card completed">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <h3>{{ completedCount }}</h3>
          <p>Завершено</p>
        </div>
      </div>
      
      <div class="stat-card progress">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <h3>{{ progressPercentage }}%</h3>
          <p>Прогресс</p>
        </div>
      </div>
    </div>
    
    <div v-if="completedCount > 0" class="actions">
      <button @click="clearCompleted" class="clear-btn">
        🗑️ Очистить завершенные ({{ completedCount }})
      </button>
    </div>
    
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TodoStats',
  computed: {
    ...mapGetters(['todosCount', 'activeCount', 'completedCount']),
    
    progressPercentage() {
      if (this.todosCount === 0) return 0
      return Math.round((this.completedCount / this.todosCount) * 100)
    }
  },
  methods: {
    ...mapActions(['clearCompleted'])
  }
}
</script>

<style scoped>
.todo-stats {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card.total {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card.active {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  color: #8b4513;
}

.stat-card.completed {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #2d5016;
}

.stat-card.progress {
  background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
  color: #5d4e75;
}

.stat-icon {
  font-size: 24px;
}

.stat-info h3 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.stat-info p {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.actions {
  text-align: center;
  margin-bottom: 15px;
}

.clear-btn {
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.progress-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-card {
    padding: 12px;
  }
  
  .stat-icon {
    font-size: 20px;
  }
  
  .stat-info h3 {
    font-size: 20px;
  }
}
</style> 