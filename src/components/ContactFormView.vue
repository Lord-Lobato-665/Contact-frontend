<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
    <!-- Encabezado del formulario -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
      <h2 class="text-2xl font-bold">Contacto Express</h2>
      <p class="mt-1 opacity-90">Te respondemos en menos de 24 horas</p>
    </div>

    <!-- Cuerpo del formulario -->
    <div class="p-6">
      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Campo Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              :value="name"
              @input="name = $event.target.value"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Ej. Juan Pérez"
            />
            <p v-if="nameError" class="text-sm text-red-500 mt-1">{{ nameError }}</p>
          </div>
        </div>

        <!-- Campo Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              :value="email"
              @input="email = $event.target.value"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="ejemplo@dominio.com"
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailError }}</p>
          </div>
        </div>

        <!-- Campo Mensaje -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tu mensaje</label>
          <div class="relative">
            <div class="absolute top-3 left-3">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <textarea
              rows="4"
              :value="message"
              @input="message = $event.target.value"
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="¿Cómo podemos ayudarte?"
            ></textarea>
            <p v-if="messageError" class="text-sm text-red-500 mt-1">{{ messageError }}</p>
          </div>
        </div>

        <!-- Checkbox términos -->
        <div class="flex items-start space-x-2">
          <input
            id="terms"
            type="checkbox"
            v-model="acceptedTerms"
            class="form-checkbox h-5 w-5 text-blue-600 mt-0.5"
          />
          <label for="terms" class="text-sm text-gray-700 select-none">
            He leído y acepto los
            <button
              type="button"
              class="text-blue-600 underline hover:text-blue-800 focus:outline-none"
              @click="openModal"
            >
              términos y condiciones
            </button>
            del servicio
          </label>
        </div>
        <p v-if="termsError" class="text-sm text-red-500 mt-1">
          Debes aceptar los términos y condiciones para continuar
        </p>

        <!-- reCAPTCHA -->
        <RecaptchaV2
          @widget-id="(id) => (widgetId = id)"
          @load-callback="(token) => (recaptchaToken = token)"
        />

        <!-- Botón de enviar -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
          :disabled="isLoading"
        >
          <svg
            v-if="isLoading"
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Enviando...' : 'Enviar Mensaje' }}
        </button>
      </form>
    </div>

    <!-- Modal de Términos y Condiciones -->
    <dialog
      ref="termsModal"
      class="fixed inset-0 z-50 p-0 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] border-0 bg-white overflow-hidden"
      style="transform: translate(-50%, -50%); top: 50%; left: 50%;"
    >
      <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
        <h3 class="text-xl font-bold">Términos y Condiciones del Servicio</h3>
        <button @click="closeModal" class="text-white hover:text-gray-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="max-h-[calc(90vh-120px)] overflow-y-auto p-6 text-gray-700">
        <div class="prose max-w-none">
          <h4 class="text-lg font-semibold text-gray-800 mb-2">1. Aceptación de los Términos</h4>
          <p class="mb-4">
            Al utilizar nuestro servicio de Contacto Express ("el Servicio"), usted ("el Usuario") acepta cumplir con estos Términos y Condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, debe abstenerse de utilizar el Servicio. El acceso y uso del Servicio está sujeto a los siguientes términos, condiciones y avisos legales.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">2. Descripción del Servicio</h4>
          <p class="mb-4">
            Nuestro Servicio proporciona un medio de comunicación directo entre los Usuarios y nuestra organización, con el compromiso de responder a las consultas en un plazo máximo de 24 horas durante días hábiles. El Servicio está diseñado para:
          </p>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Responder consultas generales sobre nuestros productos y servicios</li>
            <li>Recibir sugerencias y comentarios</li>
            <li>Atender solicitudes de información básica</li>
            <li>Proporcionar soporte inicial para problemas comunes</li>
          </ul>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">3. Obligaciones del Usuario</h4>
          <p class="mb-4">
            Al utilizar el Servicio, el Usuario se compromete a:
          </p>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Proporcionar información veraz, exacta y completa</li>
            <li>No utilizar el Servicio para fines ilegales, fraudulentos o que infrinjan derechos de terceros</li>
            <li>No enviar contenido malicioso, virus, spam o material publicitario no solicitado</li>
            <li>No suplantar la identidad de otras personas o entidades</li>
            <li>Ser mayor de 18 años o contar con autorización expresa de un tutor legal</li>
            <li>No realizar actividades que puedan sobrecargar la infraestructura del Servicio</li>
          </ul>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">4. Privacidad y Protección de Datos</h4>
          <p class="mb-4">
            El tratamiento de los datos personales proporcionados a través del Servicio se realiza de conformidad con nuestra Política de Privacidad y con la legislación aplicable en materia de protección de datos. Al utilizar el Servicio, usted consiente el tratamiento de sus datos para las siguientes finalidades:
          </p>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>Gestión y respuesta a su consulta</li>
            <li>Mejora continua de nuestros servicios</li>
            <li>Envío de información relacionada con su consulta</li>
            <li>Cumplimiento de obligaciones legales</li>
          </ul>
          <p class="mb-4">
            Los datos serán conservados durante el tiempo necesario para cumplir con estas finalidades, respetando siempre los plazos legales aplicables. Puede ejercer sus derechos de acceso, rectificación, cancelación y oposición mediante los canales indicados en nuestra Política de Privacidad.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">5. Limitaciones de Responsabilidad</h4>
          <p class="mb-4">
            Aunque nos esforzamos por proporcionar un Servicio de calidad, no podemos garantizar:
          </p>
          <ul class="list-disc pl-5 mb-4 space-y-1">
            <li>La disponibilidad ininterrumpida o libre de errores del Servicio</li>
            <li>Que las respuestas proporcionadas resuelvan completamente su consulta</li>
            <li>La exactitud absoluta de toda la información proporcionada</li>
            <li>Que el Servicio satisfaga todos sus requerimientos específicos</li>
          </ul>
          <p class="mb-4">
            En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso del Servicio.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">6. Propiedad Intelectual</h4>
          <p class="mb-4">
            Todo el contenido proporcionado a través del Servicio, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad exclusiva de nuestra organización o de sus licenciantes y está protegido por las leyes de propiedad intelectual e industrial. Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de dicho contenido sin autorización expresa.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">7. Modificaciones</h4>
          <p class="mb-4">
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las versiones actualizadas estarán disponibles en nuestro sitio web y serán efectivas inmediatamente después de su publicación. El uso continuado del Servicio después de dichas modificaciones constituirá su aceptación de los términos revisados.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">8. Legislación Aplicable y Jurisdicción</h4>
          <p class="mb-4">
            Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de [país donde opera la empresa]. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales competentes en [ciudad, país], con renuncia expresa a cualquier otro fuero o jurisdicción que pudiera corresponder.
          </p>
          
          <h4 class="text-lg font-semibold text-gray-800 mb-2">9. Contacto</h4>
          <p>
            Para cualquier cuestión relacionada con estos Términos y Condiciones o con el Servicio en general, puede ponerse en contacto con nosotros a través de los medios indicados en nuestro sitio web oficial o mediante el formulario de contacto proporcionado.
          </p>
        </div>
      </div>
      
      <div class="sticky bottom-0 bg-gray-50 p-4 border-t flex justify-end">
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          @click="acceptAndClose"
        >
          Acepto los términos
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { RecaptchaV2, useRecaptcha } from 'vue3-recaptcha-v2'

// Validación del formulario
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').max(100, 'El nombre no puede exceder 100 caracteres'),
  email: yup.string().email('Correo inválido').required('El correo es obligatorio').max(100, 'El email no puede exceder 100 caracteres'),
  message: yup.string().required('El mensaje es obligatorio').max(1000, 'El mensaje no puede exceder 1000 caracteres'),
})

const { handleSubmit } = useForm({ validationSchema: schema })
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: message, errorMessage: messageError } = useField('message')

const acceptedTerms = ref(false)
const termsError = ref(false)
const isLoading = ref(false)
const recaptchaToken = ref('')
const widgetId = ref(null)
const { handleGetResponse } = useRecaptcha()
const termsModal = ref(null)

// Abrir modal de términos
const openModal = () => {
  termsModal.value.showModal()
  document.body.style.overflow = 'hidden'
}

// Cerrar modal
const closeModal = () => {
  termsModal.value.close()
  document.body.style.overflow = 'auto'
}

// Aceptar términos y cerrar modal
const acceptAndClose = () => {
  acceptedTerms.value = true
  termsError.value = false
  closeModal()
}

// Enviar formulario
const submitForm = handleSubmit(async (values) => {
  termsError.value = false

  if (!acceptedTerms.value) {
    termsError.value = true
    await Swal.fire({
      title: 'Términos no aceptados',
      text: 'Debes aceptar los términos y condiciones para continuar',
      icon: 'warning',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#2563eb',
    })
    return
  }

  try {
    isLoading.value = true
    recaptchaToken.value = await handleGetResponse(widgetId.value)

    if (!recaptchaToken.value) {
      throw new Error('Debes verificar que no eres un robot antes de continuar.')
    }

    const response = await axios.post('http://localhost:3000/api/contact', {
      ...values,
      recaptchaToken: recaptchaToken.value,
      acceptedTerms: acceptedTerms.value,
    })

    await Swal.fire({
      title: '¡Éxito!',
      text: response.data.message || 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2563eb',
    })

    // Resetear formulario
    name.value = ''
    email.value = ''
    message.value = ''
    acceptedTerms.value = false
    recaptchaToken.value = ''
    
    // Resetear reCAPTCHA
    if (widgetId.value) {
      window.grecaptcha.reset(widgetId.value)
    }
  } catch (err) {
    Swal.fire({
      title: 'Error',
      text: err.response?.data?.error || err.message || 'No se pudo enviar el mensaje. Por favor intenta nuevamente.',
      icon: 'error',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#dc2626',
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* Estilos para el hover effect */
.hover-scale {
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: translateY(-2px);
}

/* Estilos para el modal */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
}

/* Estilos para la barra de desplazamiento */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Estilos para el texto en el modal */
.prose ul {
  margin-bottom: 1rem;
}

.prose h4 {
  margin-top: 1.5rem;
  color: #1f2937;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.6;
}
</style>