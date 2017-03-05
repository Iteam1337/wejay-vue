import Controls from '@/components/Controls'
import { mount } from '../utils/utsikt'

describe('Controls.vue', () => {
  let component

  beforeEach(() => {
    component = mount(Controls)
  })

  it('set initial data', () => {
    expect(component.data()).to.eql({
      playing: true
    })
  })
})
