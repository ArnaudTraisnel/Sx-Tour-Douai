<template>
  <div class="min-h-screen">
    <div class="relative min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30">
      <!-- Video Background -->
      <div class="absolute inset-0 w-full h-full overflow-hidden">
        <video 
          ref="videoRef"
          class="absolute min-w-full min-h-full object-cover"
          autoplay 
          loop 
          muted 
          playsinline
          preload="auto"
          @error="handleVideoError"
        >
          <source 
            :src="videoUrl" 
            type="video/mp4"
          >
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <!-- Overlay pour assurer la lisibilité du texte -->
        <div class="absolute inset-0 bg-custom-black/40"></div>
      </div>

      <!-- Contenu principal -->
       <div class="relative z-10 container-custom mx-auto">
        <div class="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span class="text-white">Supercross</span>
            <span class="ml-3 text-red-600"> Douai</span>
          </h1>
          
          <p class="text-xl md:text-2xl lg:text-3xl text-white font-light mb-12 max-w-3xl">
            Le plus grand événement de Supercross du Nord de la France
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6">
            <router-link 
              to="/tickets" 
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-[1.02] group"
            >
              Réserver maintenant
              <svg 
                class="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
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
            </router-link>
            <router-link 
              to="/contact" 
              class="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-custom-black bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Nous contacter
            </router-link>
          </div>
        </div>
      </div> 
    </div>

    <PilotesSection />
    <ProgrammeSection />
    <PartnersSection />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import ProgrammeSection from '../components/ProgrammeSection.vue'
import PilotesSection from '../components/PilotesSection.vue'
import PartnersSection from '../components/PartnersSection.vue'

const videoRef = ref(null)
const videoUrl = ref('/videos/SXTour2024.mp4')

const handleVideoError = (error) => {
  console.error('Erreur de lecture vidéo:', error)
}

const updateVideoSource = () => {
  videoUrl.value = window.innerWidth <= 768 
    ? '/videos/SXTour2024-mobile.mp4'
    : '/videos/SXTour2024.mp4'
}

const startVideo = async () => {
  if (videoRef.value) {
    try {
      updateVideoSource()
      await videoRef.value.load()
      await videoRef.value.play()
      videoRef.value.currentTime = 0
    } catch (error) {
      console.error('Erreur lors de la lecture de la vidéo:', error)
    }
  }
}

// Gérer le redimensionnement de la fenêtre
const handleResize = () => {
  if (videoRef.value) {
    startVideo()
  }
}

onMounted(() => {
  updateVideoSource()
  startVideo()
  window.addEventListener('resize', handleResize)
})

onActivated(() => {
  startVideo()
})

onDeactivated(() => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.container-custom {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.bg-custom-black {
  background-color: #000000;
}

/* Optimisation de la vidéo en arrière-plan */
video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
}
</style>
