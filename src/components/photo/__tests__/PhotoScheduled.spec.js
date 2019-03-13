import { mount } from '@vue/test-utils'
import comp from '../PhotoScheduled'
import Vue from 'vue'
import Vuetify from 'vuetify'

describe('PhotoScheduled.vue', () => {
  Vue.use(Vuetify)

  const createComp = propsData => mount(comp, { propsData })

  const photo = {
    photoId: 'photoId',
    message: 'Some message',
    photo: {
      title: 'Some title',
      secret: 'secret',
      server: 'server',
      farm: 'farm'
    }
  }

  describe('Properties', () => {
    it('requires a Photo Flickr Object', () => {
      const wrapper = createComp({ photo })
      expect(wrapper.props().photo).toBe(photo)
    })
    it('uses default height (205px)', () => {
      const wrapper = createComp({ photo })
      expect(wrapper.props().height).toBe(205)
    })
  })

  describe('Computed Properties', () => {
    it('returns the url for a photo at flickr', () => {
      const wrapper = createComp({ photo })
      const url = 'https://farmfarm.staticflickr.com/server/photoId_secret_sq.jpg'
      expect(wrapper.vm.url_sq).toBe(url)
    })
  })

  it('matches snapshot', () => {
    const wrapper = createComp({ photo })
    expect(wrapper).toMatchSnapshot()
  })
})