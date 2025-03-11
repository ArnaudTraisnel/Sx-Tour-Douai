<template>
  <section class="partners-section">
    <div class="container mx-auto px-4 pb-20">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Nos</span>
        <span class="text-red-600 ml-3">Partenaires</span>
      </h2>
      
      <div class="max-w-6xl mx-auto">
        <swiper
          :modules="[Autoplay, Pagination, Navigation]"
          :slides-per-view="slidesPerView"
          :space-between="spaceBetween"
          :loop="true"
          :slides-per-group="1"
          :looped-slides="3"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination'
          }"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }"
          class="partners-swiper"
        >
          <swiper-slide v-for="(partner, index) in partners" :key="index">
            <div class="partner-card group">
              <div class="partner-image-container">
                <img 
                  :src="partner.logo" 
                  :alt="partner.name"
                  class="partner-image"
                  loading="lazy"
                >
              </div>
            </div>
          </swiper-slide>

          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const partners = [
  {
    name: 'Gayant Expo Douai',
    logo: '/images/partners/Logo_Gayant-Expo-Douai.webp'
  },
  {
    name: 'Département du Nord',
    logo: '/images/partners/Logo_Nord-le-Departement.webp'
  },
  {
    name: 'Région Hauts-de-France',
    logo: '/images/partners/Logo_Region-hauts-de-France.webp'
  },
  {
    name: 'Fédération Française de Motocyclisme',
    logo: '/images/partners/FFMOTO_LOGO.webp'
  }
]

const slidesPerView = ref(3)
const spaceBetween = ref(30)

const updateLayout = () => {
  if (window.innerWidth < 640) {
    slidesPerView.value = 1
    spaceBetween.value = 20
  } else if (window.innerWidth < 1024) {
    slidesPerView.value = 2
    spaceBetween.value = 25
  } else {
    slidesPerView.value = 3
    spaceBetween.value = 30
  }
}

onMounted(() => {
  updateLayout()
  window.addEventListener('resize', updateLayout)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout)
})
</script>

<style scoped>
.partners-section {
  background: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 100%);
  position: relative;
  padding-top: 4rem;
}

.partners-swiper {
  padding: 20px 10px 60px !important;
}

.partner-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.partner-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.partner-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.partner-card:hover .partner-image {
  transform: scale(1.1);
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.3) !important;
  width: 8px !important;
  height: 8px !important;
  transition: all 0.3s ease;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #dc2626 !important;
  transform: scale(1.2);
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: rgba(255, 255, 255, 0.4) !important;
  transition: all 0.3s ease;
  transform: scale(0.7);
  width: 50px !important;
  height: 50px !important;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  color: #dc2626 !important;
  transform: scale(0.8);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 24px !important;
}

@media (max-width: 640px) {
  .partner-card {
    height: 180px;
    padding: 1rem;
  }
  
  .partner-image-container {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .partner-card {
    height: 200px;
  }
  
  .partner-image-container {
    padding: 1.25rem;
  }
}
</style>
