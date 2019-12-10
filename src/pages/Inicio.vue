<template>
  
  <div class="q-pa-md" style="max-width: 800px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        
        v-model="name"
        label="Nombre"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Edad"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingrese su edad',
          val => val > 0 && val < 100 || 'Solo numeros'
        ]"
      />

      <q-input v-model="text" label="Standard" />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn to="/" label="Index" outline color="purple" />
        <q-btn @click="redireccion" label="Redireccion" outline color="purple" />
        <q-btn @click="salir" label="Cerrar sesion" outline color="purple" />
      </div>
    </q-form>

    <div class="row">
  <div class="col-3">1</div>
  <div class="col-6">
  	<ul v-for="item in listar" :key="item.id">
  		<li>{{ item.titulo}}</li>
  	</ul>
  	{{ listarE }}
  </div>
  <div class="col-3">1</div>
</div>

<q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top="props">
        <img
          style="height: 50px; width: 50px"
          src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
        >

        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />
      </template>

    </q-table>
<div class="q-pa-md">
    <q-btn color="purple" @click="showNotif('bottom-left')" label="Show Notification" />
  </div>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Alert" color="primary" @click="alert" />
    <q-btn label="Confirm" color="primary" @click="confirm" />
    <q-btn label="Prompt" color="primary" @click="prompt" />
  </div>

   <div class="q-pa-md">
    <q-btn color="teal" @click="showLoading" label="Show Loading" />
  </div>



<div class="q-pa-md q-gutter-sm">
    <q-btn no-caps push color="primary" label="List BottomSheet" @click="show2(grid)" />
    <q-btn no-caps push color="white" text-color="primary" label="Grid BottomSheet" @click="show(true)" />
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-btn round color="primary" icon="shopping_cart" />
    <q-btn round color="secondary" icon="navigation" />
    <q-btn round color="amber" glossy text-color="black" icon="layers_clear" />
    <q-btn round color="brown-5" icon="directions" />
    <q-btn round color="deep-orange" icon="edit_location" />
    <q-btn round color="purple" glossy icon="local_grocery_store" />
    <q-btn round color="black" icon="my_location" />
  </div>

  </div>
</template>




<script>
import axios from 'axios'






export default {
	name: 'PageInicio',
  data () {
    return {
      name: null,
      age: null,
      listar:[],
      accept: false,
      listarE:'',
      visibleColumns: ['calories', 'desc', 'protein', 'sodium', 'iron'],
      columns: [
        {
          name: 'desc',required: true,label: 'Dessert (100g serving)',align: 'left',field: row => row.name,format: val => `${val}`,sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  },

  created() {
        this.getData();
        const token = JSON.parse(this.$q.localStorage.getItem('token'))
        console.log('token:' + token)
        if (!token) {
            this.$router.push('/login')
        }
    },


  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    getData() {
            axios.get('http://localhost/snippetWebpack/api/crud/getPost.php')
                .then(res => {
                    
                    //console.log(this.listar)
                    if(this.listar){

                         this.listar = res.data
                    }else{
                    	
                    	this.listarE = 'No existen datos'
                    }
                })
        }, 
        redireccion(){
        	this.$q.notify({
        message: 'John pinged you',
        color: 'purple'
      })
        	//this.$router.push('/')
        },
         showNotif () {
      this.$q.notify({
        message: 'John pinged you John pinged you John pinged you John pinged you John pinged you',
        color: 'blue-grey-13',
        icon:'cloud_done',
        position:'bottom-right'
      })
    },
    alert () {
      this.$q.dialog({
        title: 'Alert',
        message: 'Some message'
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    showLoading () {
      this.$q.loading.show({
        message: 'Procesando su peticion...</span>'
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 3000)
    },
    salir() {
            const token = JSON.parse(this.$q.localStorage.getItem('token'))
            axios.get('http://localhost/snippetWebpack/api/loginRegistro/salir.php?token=' + token)
                .then(res => {
                    if (res.data == 'success') {
                        this.$q.localStorage.remove('token')
                        this.$router.push('/Login')
                    }

                })
        }
  },

  beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  
  },
  //mixins:[sesion]
}
</script>