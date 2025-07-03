<template>
  <div class="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
    <!-- Encabezado con botón de cerrar sesión -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Panel de Control</h1>
      <button
        @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </div>

    <!-- Contadores -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 class="text-xl font-semibold text-blue-600 mb-2">Usuarios Registrados</h2>
        <p class="text-4xl font-bold text-gray-800">{{ users.length }}</p>
        <p class="text-gray-500 mt-2">Total de usuarios registrados en el sistema</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 class="text-xl font-semibold text-indigo-600 mb-2">Mensajes Recibidos</h2>
        <p class="text-4xl font-bold text-gray-800">{{ contacts.length }}</p>
        <p class="text-gray-500 mt-2">Total de mensajes recibidos desde el formulario</p>
      </div>
    </div>

    <!-- Tabla de Usuarios -->
    <details class="mb-6 bg-white rounded-xl shadow border border-gray-200">
      <summary class="cursor-pointer px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-100">Ver Usuarios</summary>
      <div class="p-6 overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="p-2 border-b">ID</th>
              <th class="p-2 border-b">Nombre de usuario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="p-2 border-b">{{ user.id }}</td>
              <td class="p-2 border-b">{{ user.username }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <!-- Tabla de Contactos -->
    <details class="bg-white rounded-xl shadow border border-gray-200">
      <summary class="cursor-pointer px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-100">Ver Contactos</summary>
      <div class="p-6 overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="p-2 border-b">ID</th>
              <th class="p-2 border-b">Nombre</th>
              <th class="p-2 border-b">Correo</th>
              <th class="p-2 border-b">Mensaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id" class="hover:bg-gray-50">
              <td class="p-2 border-b">{{ contact.id }}</td>
              <td class="p-2 border-b">{{ contact.name }}</td>
              <td class="p-2 border-b">{{ contact.email }}</td>
              <td class="p-2 border-b">{{ contact.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const contacts = ref([])

const fetchData = async () => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  try {
    const [usersRes, contactsRes] = await Promise.all([
      fetch('https://www.gael-lobato.space/api/auth/users', { headers }),
      fetch('https://www.gael-lobato.space/api/contact', { headers })
    ])

    if (usersRes.ok && contactsRes.ok) {
      users.value = await usersRes.json()
      contacts.value = await contactsRes.json()
    } else {
      console.error('Error al cargar los datos')
    }
  } catch (error) {
    console.error('Error en la petición:', error)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(fetchData)
</script>
