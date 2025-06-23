<template>
  <div class="max-w-3xl mx-auto">
    <h2 class="text-xl font-semibold mb-4">Lista de Contactos</h2>
    <div v-if="contacts.length" class="space-y-4">
      <div
        v-for="c in contacts"
        :key="c.id"
        class="p-4 bg-white rounded shadow border border-gray-200"
      >
        <p><strong>Nombre:</strong> {{ c.name }}</p>
        <p><strong>Email:</strong> {{ c.email }}</p>
        <p><strong>Mensaje:</strong> {{ c.message }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500">No hay contactos aún.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const contacts = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/contact')
    contacts.value = res.data
  } catch (err) {
    alert('Error al obtener los contactos')
  }
})
</script>
