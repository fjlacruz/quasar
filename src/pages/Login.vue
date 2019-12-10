<template>
<div>
    <nav class="blue"></nav>
    <div class="container center">
        <div class="row" style="margin:0,auto; width:50%;">
            <div class="col s12 m12 l12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Iniciar sesion</span>
                        <form id="inicioSesion" autocomplete="off" @submit.prevent="login">
                            <input type="email" name="email" placeholder="Correo electronico">
                            <input type="password" name="pass" placeholder="Password" required pattern="[A-Za-z0-9]{8,15}">
                            <input type="submit" value="Entrar" class="btn blue">
                        </form>
                    </div>
                    <div class="card-action">
                        <router-link to="/registro">Registrarse</router-link>
                    </div>
                    <!-- <input type="text" v-model="msg">
                    <button @click="guardar">guardar localStorage</button>-->
                </div>
            </div>
        </div>
    </div>



    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      id="inicioSesion" 
      @submit.prevent="login"
      @reset="onReset"
      class="q-gutter-md"
    >
       <q-input v-model="email" filled type="email" name="email" hint="Email" />

       <q-input
        filled
        v-model="pass"
        name="pass"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'inicisrSesion',
    data() {
        return {
            msg: '',
            email: '',
        }
    },
    methods: {
        login() {
            if (this.email == '') {
                swal('debe indicar el correo');
            } else {
            this.showLoading()
                const form = document.getElementById('inicioSesion')
                axios.post('http://localhost/api/Servicio/userLogin', new FormData(form))
                
                    .then(res => {
                        this.respuesta = res.data
                        
                        if (res.data.res == 'success') {

                            //this.$localStorage.set('token', JSON.stringify(res.data.token))
                            this.$q.localStorage.set('token', JSON.stringify(res.data.token))
                            this.$router.push('inicio')
                            this.hideLoading()

                        } else {
                            swal('Usuario y/o contraseña incorrectos')
                        }

                    })
            }

        },
        showLoading () {
      this.$q.loading.show({
        message: 'Procesando su peticion...</span>'
      })
    },
    hideLoading () {
      this.$q.loading.hide({
        message: 'Procesando su peticion...</span>'
      })
    }

    },
    created() {
        const token = JSON.parse(this.$q.localStorage.get('token'))
        if (token) {
            this.$router.push('/inicio')
        }
    }
}
</script>
