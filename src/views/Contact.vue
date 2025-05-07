<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30 pt-32 sm:pt-36 pb-16">
    <div class="container-custom mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Contact -->
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">CONTACTEZ-NOUS</h1>
          <p class="text-lg text-slate-600 max-w-lg mx-auto">
            Une question ? N'hésitez pas à nous contacter.<br>
            Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-custom p-8 sm:p-10 mb-16">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="form-label">
                  Nom et prénom <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Votre nom complet"
                >
              </div>

              <div>
                <label for="email" class="form-label">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="form-input"
                  placeholder="votre@email.com"
                >
              </div>
            </div>

            <div>
              <label for="subject" class="form-label">
                Sujet <span class="text-red-500">*</span>
              </label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                required
                class="form-input"
                placeholder="Sujet de votre message"
              >
            </div>

            <div>
              <label for="message" class="form-label">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                required
                class="form-input"
                placeholder="Votre message..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Envoyer le message</span>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>

        <!-- Section FAQ -->
        <div class="bg-white rounded-2xl shadow-custom p-8 sm:p-10">
          <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4">Questions fréquentes</h2>
          <p class="text-center text-slate-600 mb-10 max-w-lg mx-auto">
            Retrouvez ici les réponses aux questions les plus courantes concernant l'événement.
          </p>
          <div class="space-y-4">
            <div
              v-for="(item, index) in faqItems"
              :key="index"
              class="bg-gray-50 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
            >
              <button
                class="w-full px-6 py-4 text-left flex justify-between items-center gap-4"
                @click="toggleItem(index)"
              >
                <span class="font-medium text-gray-900 text-lg">{{ item.question }}</span>
                <ChevronDownIcon
                  class="w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0"
                  :class="{ 'rotate-180': openIndex === index }"
                />
              </button>
              <div
                v-show="openIndex === index"
                class="px-6 pb-6 text-slate-600 leading-relaxed"
              >
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
import { useMessagesStore } from "@/features/admin/store/messages.store"

const messagesStore = useMessagesStore()
const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
})

const openIndex = ref(null)

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqItems = [
  {
    question: "Quand aura lieu le SX Tour de Douai ?",
    answer: "Le SX Tour Douai aura lieu le 18 Octobre 2025. L'événement se déroulera avec des qualifications de 13h30 à 17h00. Les finales se dérouleront à partir de 20h00"
  },
  {
    question: "Comment acheter des billets ?",
    answer: "Les billets sont disponibles sur notre site sur la page 'Billetterie'."
  },
  {
    question: "Y a-t-il un âge minimum pour assister à l'événement ?",
    answer: "Non, l'événement est ouvert à tous les âges. Les enfants de moins de 12 ans doivent être accompagnés d'un adulte. Des tarifs spéciaux sont disponibles pour les enfants."
  },
  {
    question: "Puis-je choisir ma place(s) ?",
    answer: "Oui la séléction de la place se fait directement sur le plan du stade à l'achat des billets."
  },
  {
    question: "Des places PMR sont-elles prévus pour les PMR ?",
    answer: "Oui, tout les rangs les plus proche de la piste sont accessibles aux PMR."
  }
]

const handleSubmit = async () => {
  try {
    console.log('Début de la soumission du formulaire')
    
    // Validation basique
    if (!formData.value.name.trim() || !formData.value.email.trim() || !formData.value.subject.trim() || !formData.value.message.trim()) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      alert("Veuillez entrer une adresse email valide")
      return
    }

    console.log('Validation passée, création du message')
    
    // Créer un nouveau message
    const newMessage = {
      name: formData.value.name,
      email: formData.value.email,
      subject: formData.value.subject,
      content: formData.value.message
    }

    console.log('Message créé:', newMessage)

    // Ajouter le message à la base de données via le store
    console.log('Tentative d\'ajout au store...')
    await messagesStore.addMessage(newMessage)
    console.log('Message ajouté avec succès au store')

    // Réinitialiser le formulaire
    formData.value = {
      name: "",
      email: "",
      subject: "",
      message: ""
    }

    // Afficher une confirmation
    alert("Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.")
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.")
  }
}
</script>

<style>
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
}

.shadow-custom {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  display: block;
  width: 100%;
  border-radius: 0.5rem;
  border-color: #D1D5DB;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.form-input:focus {
  outline: none;
  border-color: #EF4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.form-input::placeholder {
  color: #9CA3AF;
}
</style>
