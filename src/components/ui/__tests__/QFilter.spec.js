import { shallowMount } from '@vue/test-utils'
import comp from '../QFilter.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

describe('QFilter.vue', () => {
  Vue.use(Vuetify)

  const createCmp = propsData => shallowMount(comp, { propsData, attrs: { search: 'Flickr' } })

  describe('Properties', () => {
    it("has a placeholder property with default to 'Search'", () => {
      const wrapper = createCmp({})
      expect(wrapper.props().placeholder).toBe('Search')
    })
  })

  describe('Computed', () => {
    it("shows search icon", () => {
      const wrapper = createCmp()
      expect(wrapper.vm.icon).toBe('search')
    })

    it('shows clear icon', () => {
      const wrapper = createCmp()
      wrapper.setData({ search: 'text' })
      expect(wrapper.vm.icon).toBe('clear')
    })
  })

  describe('Watchers', () => {
    it("emits 'search' event while typing", () => {
      const wrapper = createCmp()
      wrapper.setData({ search: 'text' })
      wrapper.vm.clearText()
      expect(wrapper.emitted().search[0][0]).toBe('text')
    })
  })

  describe('Methods', () => {
    it("emits 'ctrlEnter' event", () => {
      const wrapper = createCmp()
      wrapper.vm.ctrlEnter()
      expect(wrapper.emitted().ctrlEnter).toEqual([[]])
    })

    it("emits 'ctrlEsc' event", () => {
      const wrapper = createCmp()
      wrapper.vm.ctrlEsc()
      expect(wrapper.emitted().ctrlEsc).toEqual([[]])
    })
  })
})
