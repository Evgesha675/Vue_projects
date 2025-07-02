// Add Item Form Component
const AddItemForm = {
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save-item'],
  data() {
    return {
      newItem: '',
      newItemHighPriority: false
    }
  },
  methods: {
    saveItem() {
      if (this.newItem.trim()) {
        this.$emit('save-item', {
          label: this.newItem,
          highPriority: this.newItemHighPriority
        })
        this.clearForm()
      }
    },
    clearForm() {
      this.newItem = ''
      this.newItemHighPriority = false
    }
  },
  watch: {
    editing(newVal) {
      if (!newVal) {
        this.clearForm()
      }
    }
  },
  template: `
    <v-card-text v-if="editing" class="pa-6">
      <v-text-field
        v-model="newItem"
        @keyup.enter="saveItem"
        label="Add an Item"
        variant="outlined"
        prepend-inner-icon="mdi-cart-plus"
        class="mb-4"
        clearable
      ></v-text-field>
      
      <v-checkbox
        v-model="newItemHighPriority"
        label="High Priority"
        color="warning"
        class="mb-4"
      ></v-checkbox>
      
      <v-btn 
        @click="saveItem" 
        color="primary" 
        variant="flat"
        prepend-icon="mdi-content-save"
        block
        size="large">
        Save Item
      </v-btn>
    </v-card-text>
  `
}

// Export for use in other modules
window.AddItemForm = AddItemForm 