/*
 * @Author: lh
 * @Date: 2020-07-11 21:22:30
 * @LastEditors: lh
 * @LastEditTime: 2020-07-11 21:36:17
 * @Description:
 * @email: 3300536651@qq.com
 */
import { createElement, Text, Wrapper } from './createElement.js'

class MyComponent {
  constructor(config) {
    this.children = []
  }

  setAttribute(name, value) {
    //attribute
    this[name] = value
  }

  appendChild(child) {
    this.children.push(child)
  }

  render() {
    return (
      <div class="carousel">
        {this.data.map((url) => {
          let element = <img src={url} />
          element.addEventListener('dragstart', (event) => event.preventDefault())
          return element
        })}
      </div>
    )
  }

  mountTo(parent) {
    this.render().mountTo(parent)
  }
}

let component = data

component.mountTo(document.body)
