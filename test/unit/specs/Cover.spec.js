import Cover from '@/components/Cover.vue'
import { mount } from '../utils/utsikt'

describe('Cover.vue', () => {
  let component

  beforeEach(() => {
    component = mount(Cover)
  })


  it('renders nothing if no album', () => {
    expect(component.$el.length).to.eql(0)
  })

  it('render an image with album', () => {
    component = component
      .setProps({
        album: {
          images: [
            { url: 'test.jpg' }
          ]
        }
      })

    const img = component.find('img')

    expect(img.parent().className('album-cover')).to.be.true
    expect(img.attr('src')).to.eql('test.jpg')
    expect(img.className('cover')).to.be.true
  })
})
