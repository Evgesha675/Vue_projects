// Shopping List Items Component
const ShoppingListItems = {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['toggle-purchased', 'delete-item'],
  computed: {
    reversedItems() {
      return [...this.items].reverse()
    },
    completedCount() {
      return this.items.filter(item => item.purchased).length
    },
    totalCount() {
      return this.items.length
    }
  },
  methods: {
    togglePurchased(item) {
      this.$emit('toggle-purchased', item)
    },
    deleteItem(item) {
      this.$emit('delete-item', item)
    }
  },
  template: `
    <div>
      <!-- Progress indicator -->
      <v-card-text v-if="items.length > 0" class="pb-0">
        <div class="d-flex justify-space-between align-center mb-2">
          <span class="text-caption">Progress:</span>
          <span class="text-caption">{{ completedCount }}/{{ totalCount }} completed</span>
        </div>
        <v-progress-linear 
          :model-value="(completedCount / totalCount) * 100"
          color="success"
          height="6"
          rounded
        ></v-progress-linear>
      </v-card-text>
      
      <!-- Empty State -->
      <v-card-text v-if="items.length === 0" class="text-center py-8">
        <v-icon color="success" size="64" class="mb-4">mdi-check-circle</v-icon>
        <p class="text-h6 text-success mb-2">Nice job! You've bought all your items!</p>
        <p class="text-body-2 text-medium-emphasis">Start adding new items to your shopping list.</p>
      </v-card-text>
      
      <!-- Items List -->
      <v-list v-if="items.length > 0" class="py-0">
        <v-list-item
          v-for="item in reversedItems"
          :key="item.id"
          @click="togglePurchased(item)"
          class="border-b-sm"
          :class="{ 'bg-grey-lighten-4': item.purchased }"
          lines="one"
        >
          <template v-slot:prepend>
            <v-icon 
              :color="item.purchased ? 'success' : 'grey'"
              :icon="item.purchased ? 'mdi-check-circle' : 'mdi-circle-outline'"
              class="me-3"
            ></v-icon>
          </template>
          
          <v-list-item-title 
            :class="{ 
              'text-decoration-line-through text-medium-emphasis': item.purchased,
              'font-weight-bold': item.highPriority && !item.purchased
            }"
          >
            {{ item.label }}
          </v-list-item-title>
          
          <template v-slot:append>
            <div class="d-flex align-center">
              <v-chip 
                v-if="item.highPriority && !item.purchased" 
                color="warning" 
                size="small" 
                variant="flat"
                class="me-2"
              >
                <v-icon start icon="mdi-priority-high"></v-icon>
                High Priority
              </v-chip>
              <v-btn
                @click.stop="deleteItem(item)"
                icon="mdi-delete"
                color="error"
                variant="text"
                size="small"
                :title="'Delete ' + item.label"
              ></v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
  `
}

// Export for use in other modules
window.ShoppingListItems = ShoppingListItems 