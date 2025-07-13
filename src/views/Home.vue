<template>
  <div class="min-h-screen">
    <div class="relative min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30">
      <!-- Video Background -->
      <div class="relative w-full mt-16 md:mt-0">
        <!-- Container responsive pour la vidéo avec aspect ratio adaptatif -->
        <div 
          class="relative w-full"
          :style="{ 
            aspectRatio: isMobileOrTablet ? '9/16' : '16/9',
            minHeight: isMobileOrTablet ? '70vh' : 'auto'
          }"
        >
          <video 
            ref="videoRef"
            :class="[
              'absolute inset-0 w-full h-full bg-black',
              isMobileOrTablet ? 'object-cover' : 'object-contain'
            ]"
            autoplay 
            loop 
            muted 
            playsinline
            preload="auto"
            @error="handleVideoError"
          >
            <source 
              :src="videoUrl" 
              type="video/webm"
            >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <!-- Overlay pour assurer la lisibilité du texte -->
          <div class="absolute inset-0 bg-custom-black/40"></div>
        </div>
      </div>

      <PilotesSection />
      <ProgrammeSection />
      <PartnersSection />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import ProgrammeSection from '../components/ProgrammeSection.vue'
import PilotesSection from '../components/PilotesSection.vue'
import PartnersSection from '../components/PartnersSection.vue'

const videoRef = ref(null)
const videoUrl = ref('/videos/SXTour2025.webm')
const isMobileOrTablet = ref(false)

const handleVideoError = () => {
  // Erreur de lecture vidéo
}

const checkDeviceType = () => {
  isMobileOrTablet.value = window.innerWidth <= 1024 // Inclut les tablettes
}

const updateVideoSource = () => {
  checkDeviceType()
  videoUrl.value = isMobileOrTablet.value 
    ? '/videos/SXTour2025-mobile.webm'
    : '/videos/SXTour2025.webm'
}

const startVideo = async () => {
  if (videoRef.value) {
    try {
      updateVideoSource()
      await videoRef.value.load()
      await videoRef.value.play()
      videoRef.value.currentTime = 0
    } catch (error) {
      // Erreur lors de la lecture de la vidéo
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
  checkDeviceType()
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
</style>
