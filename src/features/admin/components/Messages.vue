<template>
  <div class="min-h-[calc(100vh-4rem)] pb-16 lg:pb-0">
    <!-- Search Bar -->
    <div 
      :class="[
        'bg-white border-b border-gray-200 transition-all duration-200 sticky top-0 z-20',
        {'hidden': selectedMessage && isMobileOrTablet}
      ]"
    >
      <div class="w-full px-4 py-3">
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1 relative">
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Rechercher..."
              class="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-red-500 focus:bg-white transition-colors duration-200"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            v-model="filterStatus"
            class="sm:w-32 px-3 py-2 text-sm bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-red-500 focus:bg-white transition-colors duration-200"
          >
            <option value="all">Tous</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Messages List -->
      <div
        :class="[
          'transition-all duration-300 ease-in-out overflow-y-auto w-full',
          {'hidden': selectedMessage && isMobileOrTablet}
        ]"
      >
        <div class="divide-y divide-gray-100">
          <div
            v-for="message in filteredMessages"
            :key="message.id"
            @click="selectMessage(message)"
            class="group relative hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            :class="{'bg-gray-50': selectedMessage?.id === message.id}"
          >
            <!-- Unread Indicator -->
            <div
              v-if="!message.read"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r"
            ></div>
            
            <div class="px-4 py-4">
              <div class="flex justify-between items-baseline mb-1">
                <h3 class="text-base font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                  {{ message.sender }}
                </h3>
                <time class="text-sm text-gray-500">{{ formatDate(message.created_at) }}</time>
              </div>
              <h4 
                class="text-base text-gray-900 mb-2 truncate"
                :class="{'font-medium': !message.read}"
              >
                {{ message.subject }}
              </h4>
              <p class="text-sm text-gray-500 line-clamp-2">{{ message.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Detail -->
      <div 
        v-if="selectedMessage" 
        class="fixed inset-0 bg-white z-30"
        style="top: 73px;"
      >
        <div class="h-full overflow-y-auto pb-[120px] lg:pb-[80px]">
          <!-- Bouton Retour -->
          <div class="sticky top-0 bg-white border-b border-gray-200">
            <button
              @click="closeMessage"
              class="p-4 flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              <span class="ml-2">Retour</span>
            </button>
          </div>

          <!-- Message Content -->
          <div class="px-4 py-2">
            <h2 class="text-xl font-medium text-gray-900 mb-4">{{ selectedMessage.subject }}</h2>
            <div class="text-sm text-gray-600">
              <span class="font-medium">{{ selectedMessage.sender }}</span>
              <span class="mx-1">&lt;{{ selectedMessage.email }}&gt;</span>
            </div>
            <div class="text-sm text-gray-500 mt-1">
              {{ formatDate(selectedMessage.created_at, true) }}
            </div>
            <div class="mt-6 prose max-w-none">
              <p class="whitespace-pre-wrap">{{ selectedMessage.content }}</p>
            </div>
          </div>
        </div>

        <!-- Message Actions -->
        <div class="fixed left-0 right-0 bg-white border-t border-gray-200 p-4" style="bottom: 64px;">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex gap-2 flex-1">
              <button
                @click="toggleRead(selectedMessage)"
                class="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                {{ selectedMessage.read ? 'Marquer comme non lu' : 'Marquer comme lu' }}
              </button>
              <button
                @click="deleteMessage(selectedMessage)"
                class="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
            <button
              @click="showReplyForm = !showReplyForm"
              class="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              Répondre
            </button>
          </div>

          <!-- Reply Form -->
          <div
            v-if="showReplyForm"
            class="mt-3 bg-white"
          >
            <textarea
              v-model="replyContent"
              rows="4"
              class="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Votre réponse..."
            ></textarea>
            <div class="mt-3 flex justify-end gap-2">
              <button
                @click="showReplyForm = false"
                class="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                @click="sendReply"
                class="px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useMessagesStore } from '../store/messages.store'
import { sendEmail } from '@/services/emailService'

const messagesStore = useMessagesStore()
const searchQuery = ref('')
const filterStatus = ref('all')
const selectedMessage = ref(null)
const replyContent = ref('')
const showReplyForm = ref(false)
const isMobileOrTablet = ref(window.innerWidth < 1024)

const handleResize = () => {
  isMobileOrTablet.value = window.innerWidth < 1024
}

onMounted(() => {
  console.log('Messages component mounted')
  window.addEventListener('resize', handleResize)
  messagesStore.fetchMessages()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const filteredMessages = computed(() => {
  console.log('Computing filtered messages')
  let messages = messagesStore.sortedMessages
  console.log('Got sorted messages:', messages)
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    messages = messages.filter(message => 
      message.sender.toLowerCase().includes(query) ||
      message.subject.toLowerCase().includes(query) ||
      message.content.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value !== 'all') {
    messages = messages.filter(message => 
      filterStatus.value === 'unread' ? !message.read : message.read
    )
  }

  console.log('Filtered messages:', messages)
  return messages
})

// Forcer le rafraîchissement des messages toutes les 5 secondes
const refreshInterval = setInterval(() => {
  console.log('Refreshing messages')
  messagesStore.fetchMessages()
}, 5000)

// Nettoyer l'intervalle quand le composant est détruit
onUnmounted(() => {
  clearInterval(refreshInterval)
})

function selectMessage(message) {
  selectedMessage.value = message
  if (!message.read) {
    messagesStore.updateMessageStatus(message.id, 'read')
  }
  showReplyForm.value = false
}

function closeMessage() {
  selectedMessage.value = null
  showReplyForm.value = false
}

function toggleRead(message) {
  const newStatus = message.read ? 'unread' : 'read'
  messagesStore.updateMessageStatus(message.id, newStatus)
}

async function deleteMessage(message) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
    await messagesStore.deleteMessage(message.id)
    selectedMessage.value = null
    showReplyForm.value = false
  }
}

async function sendReply() {
  if (!replyContent.value.trim()) {
    return
  }

  try {
    const response = await sendEmail({
      to: selectedMessage.value.email,
      subject: `Re: ${selectedMessage.value.subject}`,
      text: replyContent.value,
      html: `<p>${replyContent.value.replace(/\n/g, '<br>')}</p>`
    })

    if (response.success) {
      // Mettre à jour le statut du message
      await messagesStore.updateMessageStatus(selectedMessage.value.id, 'replied')
      
      // Réinitialiser le formulaire
      replyContent.value = ''
      showReplyForm.value = false
      
      // Notification de succès
      alert('Réponse envoyée avec succès')
    } else {
      throw new Error(response.error)
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la réponse:', error)
    alert('Erreur lors de l\'envoi de la réponse. Veuillez réessayer.')
  }
}

function formatDate(date, detailed = false) {
  const now = new Date()
  const messageDate = new Date(date)
  const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24))
  
  if (detailed) {
    return messageDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  if (diffDays === 0) {
    return messageDate.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } else if (diffDays === 1) {
    return 'Hier'
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString('fr-FR', { weekday: 'long' })
  } else {
    return messageDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    })
  }
}
</script>

<style scoped>
.prose {
  font-size: 1rem;
  line-height: 1.75;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
