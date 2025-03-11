<template>
  <div class="min-h-screen">
    <div class="relative min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30">
      <!-- Video Background -->
      <div class="relative w-full h-[300px] md:h-screen overflow-hidden mt-16 md:mt-0">
        <video 
          ref="videoRef"
          class="absolute top-0 left-0 w-full h-full object-contain md:object-cover"
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
