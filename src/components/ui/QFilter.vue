<template>
  <v-text-field
    ref="input"
    v-model="search"
    :placeholder="placeholder"
    v-bind="$listeners"
    solo-inverted
    clearable
    class="mx-auto"
    style="max-width: 500px; min-width: 128px"
    prepend-inner-icon="search"
    @click:append="clearText"
    @keyup.exact.esc="clearText"
    @keyup.enter="enter"
    @keyup.ctrl.enter="ctrlEnter"
    @keyup.exact.ctrl.esc="ctrlEsc"
  />
</template>
<script>
export default {
  name: 'QFilter',
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    dontFocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      searches: []
    }
  },
  computed: {
    icon() {
      return this.search.length === 0 ? 'search' : 'clear'
    }
  },
  watch: {
    search(value) {
      if (value === null || value === '') {
        this.$emit('clear')
      }
      this.$emit('search', value === null ? '' : value)
    }
  },
  mounted() {
    if (!this.dontFocus) {
      this.$refs.input.focus()
    }
    this.search = ''
  },
  methods: {
    clearText() {
      this.search = ''
      this.$emit('clear')
    },
    enter() {
      this.$emit('enter', this.search)
    },
    ctrlEnter() {
      this.$emit('ctrlEnter')
    },
    ctrlEsc() {
      this.$emit('ctrlEsc')
    }
  }
}
</script>

