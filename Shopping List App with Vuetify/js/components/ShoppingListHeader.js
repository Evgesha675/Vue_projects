// Shopping List Header Component
const ShoppingListHeader = {
  props: {
    header: {
      type: String,
      default: 'Welcome'
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-edit'],
  template: `
    <v-card-title class="bg-primary text-white text-center d-flex justify-space-between align-center">
      <h1 class="text-h4 font-weight-light">{{ header }}</h1>
      <v-btn 
        v-if="editing" 
        @click="$emit('toggle-edit', false)" 
        color="error" 
        variant="flat"
        prepend-icon="mdi-close">
        Cancel
      </v-btn>
      <v-btn 
        v-else 
        @click="$emit('toggle-edit', true)" 
        color="secondary" 
        variant="flat"
        prepend-icon="mdi-plus">
        Add Item
      </v-btn>
    </v-card-title>
  `
}

// Export for use in other modules
window.ShoppingListHeader = ShoppingListHeader 