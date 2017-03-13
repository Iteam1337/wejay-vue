import Vue from 'vue'

/**
 * Get attributes for an element
 * @param {element} element
 */
const attr = (element) => (name) =>
  element.getAttribute(name)

/**
 * Get classes on an element
 * @param {element} element
 */
const classes = (element) => () =>
  Object
    .values(element.classList)
    .filter(name => typeof name === 'string')

/**
 * Element contains className
 * @param {element} element
 */
const className = (element) => (name) =>
  element.classList.contains(name)

/**
 * Get parent to element
 * @param {element} element
 */
const parent = (element) => () =>
  find(element.parentNode)()

/**
 * Find an element
 * Anything that goes in querySelector is valid
 * @param {element} element
 */
const find = (element) => (selector) => {
  if (selector) {
    element = element.querySelector(selector)
  }

  return {
    attr: attr(element),
    classes: classes(element),
    className: className(element),
    parent: parent(element)
  }
}

/**
 * Mount an element and set props
 * @param {Component} Component
 * @param {object} propsData
 */
function renderedElement (Component) {
  return (propsData) => {
    const Ctor = Vue.extend(Component)
    const vm = new Ctor({ propsData }).$mount()

    vm.find = find(vm.$el)
    vm.props = () => vm._props
    vm.data = () => vm._data

    return vm
  }
}

export function mount (Component) {
  const vm = renderedElement(Component)()

  vm.setProps = renderedElement(Component)

  return vm
}
