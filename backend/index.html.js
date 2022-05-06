import { html } from 'lit'
import './components/MyApp.js'

// This will be rendered on the server and delivered as the index for this site
export default ({ name, count }) => {
  // "lit": "https://cdn.jsdelivr.net/gh/lit/dist@2.2.3/core/lit-core.min.js"
  return html`<html>
    <script type="importmap">
      {
        "imports": {
          "lit": "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"
        }
      }
    </script>
    <style>
      html {
        --theme-primary: #009966;
        --theme-secondary: #520c9c;
      }
    </style>
    <body>
      <my-app name="${name}" count="${count}"></my-app>
    </body>

    <script type="module">
      await import('https://unpkg.com/lit-element/experimental-hydrate-support.js?module')
      import('/_static/MyApp.js')
    </script>
  </html>`
}
