// Main Shopping List Application
const { createApp } = Vue
const { createVuetify } = Vuetify

// Vuetify Configuration
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#4CAF50',
          secondary: '#2196F3',
          accent: '#FF9800',
          error: '#F44336',
          warning: '#FF9800',
          info: '#2196F3',
          success: '#4CAF50'
        }
      }
    }
  }
})

// Main Application
const ShoppingListApp = createApp({
  components: {
    'shopping-list-header': ShoppingListHeader,
    'add-item-form': AddItemForm,
    'shopping-list-items': ShoppingListItems
  },
  data() {
    return {
      header: 'Shopping List App',
      editing: false,
      nextId: 4, // Отслеживаем следующий ID
      items: [
        {id: 1, label:'10 party hats', purchased: true, highPriority: false},
        {id: 2, label:'2 board games', purchased: true, highPriority: false},
        {id: 3, label:'20 cups', purchased: false, highPriority: true},
      ]
    }
  },
  mounted() {
    // Загружаем данные из localStorage при запуске
    this.loadFromStorage()
  },
  watch: {
    // Автоматически сохраняем изменения
    items: {
      handler() {
        this.saveToStorage()
      },
      deep: true
    }
  },
  methods: {
    toggleEdit(editing) {
      this.editing = editing
    },
    saveItem(itemData) {
      if (itemData.label && itemData.label.trim()) {
        this.items.push({
          id: this.nextId++, // Используем уникальный ID
          label: itemData.label.trim(),
          purchased: false,
          highPriority: itemData.highPriority || false
        })
        this.editing = false
      }
    },
    togglePurchased(item) {
      item.purchased = !item.purchased
    },
    deleteItem(item) {
      const index = this.items.findIndex(i => i.id === item.id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },
    saveToStorage() {
      try {
        localStorage.setItem('shopping-list-items', JSON.stringify(this.items))
        localStorage.setItem('shopping-list-nextId', this.nextId.toString())
      } catch (e) {
        console.warn('Could not save to localStorage:', e)
      }
    },
    loadFromStorage() {
      try {
        const savedItems = localStorage.getItem('shopping-list-items')
        const savedNextId = localStorage.getItem('shopping-list-nextId')
        
        if (savedItems) {
          this.items = JSON.parse(savedItems)
        }
        if (savedNextId) {
          this.nextId = parseInt(savedNextId, 10)
        }
      } catch (e) {
        console.warn('Could not load from localStorage:', e)
      }
    }
  }
})

// Mount the application
ShoppingListApp.use(vuetify).mount('#app') 