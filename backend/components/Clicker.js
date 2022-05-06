import { css, html, LitElement } from 'lit'
export default class Clicker extends LitElement {
  static properties = {
    count: { type: Number },
  }

  static styles = css`
    p {
      color: var(--theme-primary);
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
    return html`
      <p>Count ${this.count}</p>
      <button @click="${this._increment}">Click</button>
    `
  }
}

customElements.define('my-clicker', Clicker)
