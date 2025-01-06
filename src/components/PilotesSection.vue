<template>
  <section class="bg-black relative w-full overflow-hidden pt-16 md:pt-24 lg:pt-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
      <!-- En-tête -->
      <div class="text-center max-w-4xl mx-auto mb-10">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          <span class="text-red-600">Pilotes</span>
        </h2>
        <p class="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez les talents qui feront vibrer la piste lors du SX Tour Douai
        </p>
      </div>

      <!-- Sélection de catégorie -->
      <div class="flex justify-center gap-8 mb-12">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          class="text-2xl font-bold transition-all duration-300 px-6 py-2"
          :class="selectedCategory === cat ? 'text-red-600 border-b-2 border-red-600' : 'text-white hover:text-red-400'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Galerie de pilotes -->
      <div class="w-full flex justify-center">
        <div 
          class="flex flex-col md:flex-row gallery-container"
          :class="{
            'w-[85%] md:w-[90%] lg:w-full': true,
            'h-auto md:h-[60vh] lg:h-[85vh]': true,
            'space-y-2 md:space-y-0': true
          }"
        >
          <div
            v-for="(pilote, index) in pilotesFiltres"
            :key="pilote.id"
            @mouseenter="hoveredIndex = index"
            class="relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out group"
            :class="{
              'aspect-[16/9] md:aspect-auto': true,
              'w-full md:w-auto': true,
              'flex-grow-0 flex-shrink-0 md:flex-1': true,
              'h-[12vh] md:h-full': hoveredIndex !== index,
              'h-[45vh] md:h-full': hoveredIndex === index,
              'hover:h-[45vh] md:hover:h-full': true,
              'md:basis-[10%] lg:basis-[12%]': hoveredIndex !== index,
              'md:hover:basis-[45%] lg:hover:basis-[35%]': true,
              'md:basis-[45%] lg:basis-[35%]': hoveredIndex === index,
              'opacity-70 hover:opacity-100': hoveredIndex !== index,
              'opacity-100': hoveredIndex === index
            }"
          >
            <!-- Image -->
            <img
              :src="pilote.image"
              :alt="pilote.fullName"
              class="w-full h-full object-cover transition-all duration-500"
            />

            <!-- Overlay -->
            <div 
              class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300"
              :class="{
                'opacity-100': hoveredIndex === index,
                'opacity-0 group-hover:opacity-100': hoveredIndex !== index
              }"
            >
              <!-- Numéro -->
              <div class="absolute top-4 md:top-6 right-4 md:right-6">
                <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 drop-shadow-lg">
                  #{{ pilote.numero }}
                </span>
              </div>

              <!-- Nom -->
              <div 
                class="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 transition-all duration-300"
                :class="{
                  'translate-y-0': hoveredIndex === index,
                  'translate-y-full group-hover:translate-y-0': hoveredIndex !== index
                }"
              >
                <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
                  {{ pilote.prenom }}
                  <span class="text-red-600">{{ pilote.nom }}</span>
                </h3>
                <p class="text-base md:text-lg lg:text-xl text-gray-300">
                  {{ pilote.team }} - {{ pilote.palmares }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Catégories disponibles
const categories = ['125cc', '250cc', '450cc']
const selectedCategory = ref('125cc')

// Ajout de l'état pour suivre l'image survolée
const hoveredIndex = ref(0)

// Données statiques des pilotes
const pilotes125cc = [
  {
    id: 1,
    prenom: 'Adrien',
    nom: 'ECOFFIER',
    numero: '137',
    team: 'Bud Racing Team',
    palmares: '2x Champion de France SX Tour',
    image: '/images/pilotes_125/Adrien_ECOFFIER_137.jpg'
  },
  {
    id: 2,
    prenom: 'Anthony',
    nom: 'BOURDON',
    numero: '945',
    team: 'Monster Energy Kawasaki',
    palmares: 'Champion SX Tour 2023',
    image: '/images/pilotes_125/Anthony_BOURDON_945.jpg'
  },
  {
    id: 3,
    prenom: 'Cedric',
    nom: 'SOUBEYRAS',
    numero: '85',
    team: 'Honda SR Motoblouz',
    palmares: '3x Vainqueur Supercross de Paris',
    image: '/images/pilotes_125/Cedric_SOUBEYRAS_85.jpg'
  },
  {
    id: 4,
    prenom: 'Gregory',
    nom: 'ARRANDA',
    numero: '20',
    team: 'Team VHR KTM',
    palmares: 'Champion d\'Europe 2022',
    image: '/images/pilotes_125/Gregory_ARRANDA_20.jpg'
  },
  {
    id: 5,
    prenom: 'Jorge',
    nom: 'ZARAGOZA',
    numero: '99',
    team: 'Team GSM Dafy',
    palmares: 'Vice-Champion d\'Espagne 2023',
    image: '/images/pilotes_125/Jorge_ZARAGOZA_99.jpg'
  },
  {
    id: 6,
    prenom: 'Lorenzo',
    nom: 'CAMPORESE',
    numero: '384',
    team: 'Standing Construct GASGAS',
    palmares: 'Champion d\'Italie en titre',
    image: '/images/pilotes_125/Lorenzo_CAMPORESE_384.jpg'
  }
]

const pilotes250cc = [
  {
    id: 1,
    prenom: 'Adrien',
    nom: 'ECOFFIER',
    numero: '137',
    team: 'Bud Racing Team',
    palmares: '2x Champion de France SX Tour',
    image: '/images/pilotes_250/Adrien_ECOFFIER_137.jpg'
  },
  {
    id: 2,
    prenom: 'Anthony',
    nom: 'BOURDON',
    numero: '945',
    team: 'Monster Energy Kawasaki',
    palmares: 'Champion SX Tour 2023',
    image: '/images/pilotes_250/Anthony_BOURDON_945.jpg'
  },
  {
    id: 3,
    prenom: 'Cedric',
    nom: 'SOUBEYRAS',
    numero: '85',
    team: 'Honda SR Motoblouz',
    palmares: '3x Vainqueur Supercross de Paris',
    image: '/images/pilotes_250/Cedric_SOUBEYRAS_85.jpg'
  },
  {
    id: 4,
    prenom: 'Gregory',
    nom: 'ARRANDA',
    numero: '20',
    team: 'Team VHR KTM',
    palmares: 'Champion d\'Europe 2022',
    image: '/images/pilotes_250/Gregory_ARRANDA_20.jpg'
  },
  {
    id: 5,
    prenom: 'Jorge',
    nom: 'ZARAGOZA',
    numero: '99',
    team: 'Team GSM Dafy',
    palmares: 'Vice-Champion d\'Espagne 2023',
    image: '/images/pilotes_250/Jorge_ZARAGOZA_99.jpg'
  },
  {
    id: 6,
    prenom: 'Lorenzo',
    nom: 'CAMPORESE',
    numero: '384',
    team: 'Standing Construct GASGAS',
    palmares: 'Champion d\'Italie en titre',
    image: '/images/pilotes_250/Lorenzo_CAMPORESE_384.jpg'
  }
]

const pilotes450cc = [
  {
    id: 1,
    prenom: 'Adrien',
    nom: 'ECOFFIER',
    numero: '137',
    team: 'Bud Racing Team',
    palmares: '2x Champion de France SX Tour',
    image: '/images/pilotes_450/Adrien_ECOFFIER_137.jpg'
  },
  {
    id: 2,
    prenom: 'Anthony',
    nom: 'BOURDON',
    numero: '945',
    team: 'Monster Energy Kawasaki',
    palmares: 'Champion SX Tour 2023',
    image: '/images/pilotes_450/Anthony_BOURDON_945.jpg'
  },
  {
    id: 3,
    prenom: 'Cedric',
    nom: 'SOUBEYRAS',
    numero: '85',
    team: 'Honda SR Motoblouz',
    palmares: '3x Vainqueur Supercross de Paris',
    image: '/images/pilotes_450/Cedric_SOUBEYRAS_85.jpg'
  },
  {
    id: 4,
    prenom: 'Gregory',
    nom: 'ARRANDA',
    numero: '20',
    team: 'Team VHR KTM',
    palmares: 'Champion d\'Europe 2022',
    image: '/images/pilotes_450/Gregory_ARRANDA_20.jpg'
  },
  {
    id: 5,
    prenom: 'Jorge',
    nom: 'ZARAGOZA',
    numero: '99',
    team: 'Team GSM Dafy',
    palmares: 'Vice-Champion d\'Espagne 2023',
    image: '/images/pilotes_450/Jorge_ZARAGOZA_99.jpg'
  },
  {
    id: 6,
    prenom: 'Lorenzo',
    nom: 'CAMPORESE',
    numero: '384',
    team: 'Standing Construct GASGAS',
    palmares: 'Champion d\'Italie en titre',
    image: '/images/pilotes_450/Lorenzo_CAMPORESE_384.jpg'
  }
]

// Sélectionner les pilotes selon la catégorie
const pilotesFiltres = computed(() => {
  switch (selectedCategory.value) {
    case '125cc':
      return pilotes125cc
    case '250cc':
      return pilotes250cc
    case '450cc':
      return pilotes450cc
    default:
      return pilotes125cc
  }
})
</script>

<style scoped>
.gallery-container {
  will-change: contents;
}

.group {
  will-change: transform, height, opacity;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

img {
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}

/* Effet de réduction de la première image quand on survole les autres */
@media (min-width: 768px) {
  .gallery-container:hover .first-image {
    flex-basis: 12% !important;
  }
  
  .gallery-container:hover .first-image .first-overlay {
    opacity: 0 !important;
  }

  .gallery-container:hover .first-image .first-content {
    transform: translateY(100%) !important;
  }
  
  .gallery-container .first-image:hover {
    flex-basis: 35% !important;
  }

  .gallery-container .first-image:hover .first-overlay {
    opacity: 1 !important;
  }

  .gallery-container .first-image:hover .first-content {
    transform: translateY(0) !important;
  }
}
</style>
