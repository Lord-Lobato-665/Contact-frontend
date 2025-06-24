<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Contacto Express</h2>
      <p class="mt-1 opacity-90">Te respondemos en menos de 24 horas</p>
    </div>
    <div class="p-6">
      <form @submit.prevent="submitForm" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input :value="name" @input="name = $event.target.value" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="Ej. Juan Pérez" />
            <p v-if="nameError" class="text-sm text-red-500 mt-1">{{ nameError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input type="email" :value="email" @input="email = $event.target.value" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="ejemplo@dominio.com" />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tu mensaje</label>
          <div class="relative">
            <div class="absolute top-3 left-3">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <textarea rows="4" :value="message" @input="message = $event.target.value" class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" placeholder="¿Cómo podemos ayudarte?"></textarea>
            <p v-if="messageError" class="text-sm text-red-500 mt-1">{{ messageError }}</p>
          </div>
        </div>
        <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center" :disabled="isLoading">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Enviando...' : 'Enviar Mensaje' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio'),
  message: yup.string().required('El mensaje es obligatorio')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: message, errorMessage: messageError } = useField('message')

const isLoading = ref(false)

const submitForm = handleSubmit(async (values) => {
  try {
    isLoading.value = true
    await axios.post('http://localhost:3000/api/contact', values)

    Swal.fire({
      title: '¡Éxito!',
      text: 'Mensaje enviado correctamente',
      icon: 'success',
      confirmButtonText: 'Genial',
      confirmButtonColor: '#2563eb'
    })

    resetForm()
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: 'No se pudo enviar el mensaje',
      icon: 'error',
      confirmButtonText: 'Intentar de nuevo',
      confirmButtonColor: '#dc2626'
    })
  } finally {
    isLoading.value = false
  }
})
</script>


<style scoped>
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: translateY(-2px);
}
</style>