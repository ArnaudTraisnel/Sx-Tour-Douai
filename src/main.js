import { createApp } from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import router from "./router"

// Import styles
import "./assets/styles/main.scss"

// Create Vue app
const app = createApp(App)

// Configure app
app.config.performance = true
app.config.errorHandler = (err) => {
  console.error('Vue Error:', err)
}

// Use plugins
app.use(createPinia())
app.use(router)

// Mount app
app.mount('#app')
