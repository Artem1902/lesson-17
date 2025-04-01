import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "./router/index.js";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


//--- FontAwesome ---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fab, fas, far)

const pinia = createPinia()

const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia).use(router).use(vuetify).mount('#app')
