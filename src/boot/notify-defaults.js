// import something here

// "async" is optional
//export default async ({ /* app, router, Vue, ... */ }) => {
  // something to do
//}


import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})