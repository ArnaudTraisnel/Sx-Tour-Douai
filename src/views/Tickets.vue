<template>
  <div class="tickets-page min-h-screen bg-white">
    <!-- Spacer pour éviter que le contenu soit caché sous la navbar -->
    <div class="h-20"></div>
    
    <div class="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <section class="flex flex-col items-center">
        <!-- En-tête avec espacement adaptatif -->
        <div class="text-center space-y-4 mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl mx-auto">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-gray-900">
            BILLETTERIE
          </h1>
          <p class="text-gray-600 text-base sm:text-lg md:text-xl mx-auto px-4">
            Choisissez votre place pour vivre une expérience inoubliable au Supercross de Douai
          </p>
        </div>

        <!-- Conteneur flex pour centrer la grille -->
        <div class="w-full max-w-7xl px-4">
          <!-- Utilisation de flex au lieu de grid pour un meilleur contrôle du centrage -->
          <div class="flex flex-wrap justify-center -mx-2 sm:-mx-3 lg:-mx-4">
            <div v-for="(ticket, index) in tickets" 
                 :key="index"
                 class="w-full md:w-1/2 lg:w-1/3 px-2 sm:px-3 lg:px-4 mb-4 sm:mb-6 lg:mb-8 flex justify-center"
            >
              <div class="w-full max-w-sm">
                <a 
                  :href="ticket.link"
                  target="_blank"
                  @click="handleTicketClick"
                  :class="[
                    'group relative overflow-hidden rounded-xl p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl block h-full',
                    ticket.gradientClass
                  ]"
                >
                  <div class="relative flex flex-col h-full space-y-4 p-4 sm:p-6 text-white">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg sm:text-xl font-bold">{{ ticket.name }}</h3>
                      <span class="text-xl sm:text-2xl">{{ ticket.icon }}</span>
                    </div>
                    <p class="text-gray-100 text-sm sm:text-base flex-grow">{{ ticket.description }}</p>
                    <div class="flex items-center justify-between mt-2 sm:mt-4">
                      <span class="text-base sm:text-lg font-semibold">{{ ticket.price }}</span>
                      <span class="inline-flex items-center text-sm font-medium text-white group-hover:text-gray-200 transition-colors duration-300">
                        Réserver
                        <svg 
                          class="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Spacer du bas pour éviter que le contenu soit collé au bas de page -->
        <div class="h-12 sm:h-16 md:h-20"></div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from '@/features/admin/store/stats.store'
import { ref } from 'vue'

const statsStore = useStatsStore()

const tickets = ref([
  {
    name: 'Mezzanine',
    description: 'Une vue imprenable sur l\'événement depuis les hauteurs',
    price: '49,99 €',
    link: 'https://www.ticketmaster.fr/fr',
    icon: '🎭',
    gradientClass: 'bg-gradient-to-br from-gray-600 to-gray-800 hover:shadow-gray-500/20'
  },
  {
    name: 'Tribune',
    description: 'Le meilleur compromis entre confort et visibilité',
    price: '69,99 €',
    link: 'https://www.ticketmaster.fr/fr',
    icon: '👥',
    gradientClass: 'bg-gradient-to-br from-[#88132b] to-[#5d0d1e] hover:shadow-[#88132b]/20'
  },
  {
    name: 'Carré Or',
    description: 'Au plus près de l\'action, une expérience unique',
    price: '89,99 €',
    link: 'https://www.ticketmaster.fr/fr',
    icon: '⭐',
    gradientClass: 'bg-gradient-to-br from-yellow-500 to-yellow-700 hover:shadow-yellow-500/20'
  },
  {
    name: 'Privilège',
    description: 'Un accès exclusif avec services premium',
    price: '129,99 €',
    link: 'https://www.ticketmaster.fr/fr',
    icon: '✨',
    gradientClass: 'bg-gradient-to-br from-purple-500 to-purple-800 hover:shadow-purple-500/20'
  },
  {
    name: 'VIP',
    description: 'L\'expérience ultime avec accès aux coulisses',
    price: '199,99 €',
    link: 'https://www.ticketmaster.fr/fr',
    icon: '👑',
    gradientClass: 'bg-gradient-to-br from-[#c4a484] to-[#8b7355] hover:shadow-[#c4a484]/20'
  }
])

const handleTicketClick = async () => {
  await statsStore.recordTicketClick()
}
</script>

<style lang="scss" scoped>
.container-custom {
  max-width: 1400px;
  margin: 0 auto;
}

/* Ajout d'un effet de grain subtil sur le fond */
.tickets-page {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23f0f0f0' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
