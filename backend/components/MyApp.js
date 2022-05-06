import { css, html, LitElement } from 'lit'
import './Clicker.js'

export default class MyApp extends LitElement {
  static properties = {
    name: { type: String },
    count: { type: Number },
  }

  static styles = css`
    p {
      color: var(--theme-secondary);
    }
  `
  constructor() {
    super()
    this.count = 10
  }
  _increment() {
    this.count++
  }
  render() {
    return html`<p>Hello there ${this.name}</p>
      <my-clicker count=${this.count.toString()}></my-clicker>`
  }
}

customElements.define('my-app', MyApp)
