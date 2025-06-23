<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Formulario de Contacto</h2>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <input v-model="form.name" class="input" placeholder="Nombre" required />
      <input v-model="form.email" class="input" placeholder="Email" required />
      <textarea v-model="form.message" class="input" placeholder="Mensaje" required></textarea>
      <button type="submit" class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Enviar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitForm = async () => {
  try {
    await axios.post('http://localhost:3000/api/contact', form)
    alert('Mensaje enviado con éxito')
    form.name = form.email = form.message = ''
  } catch (err) {
    alert('Error al enviar el mensaje')
  }
}
</script>
