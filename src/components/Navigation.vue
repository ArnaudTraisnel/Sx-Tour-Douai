<template>
  <nav class="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight whitespace-nowrap">
            <span class="text-gray-900">Supercross</span>
            <span class="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"> Douai</span>
          </router-link>
          <div class="flex items-center ml-6 space-x-1 md:space-x-2 lg:space-x-3">
            <img src="/images/partners/FFMOTO_LOGO.png" alt="Logo FFMoto" class="h-10 md:h-16 lg:h-20 w-auto object-contain"/>
            <img src="/images/partners/Supercross_Championnat_FR.png" alt="Logo Championnat de France Supercross" class="h-10 md:h-16 lg:h-20 w-auto object-contain mix-blend-multiply"/>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex lg:items-center">
          <div class="flex items-center space-x-6 lg:space-x-8">
            <router-link
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="px-3 py-2 text-base font-medium tracking-wide transition-all duration-300 hover:bg-gray-50"
              :class="[$route.path === item.path ? 'text-red-600' : 'text-gray-700']"
            >
              {{ item.name }}
            </router-link>
            <!-- Dashboard Link -->
            <router-link
              v-if="isLoggedIn"
              to="/admin"
              class="px-3 py-2 text-base font-medium tracking-wide transition-all duration-300 hover:bg-gray-50"
              :class="[$route.path.startsWith('/admin') ? 'text-red-600' : 'text-gray-700']"
            >
              Dashboard
            </router-link>
            <!-- Logout Button -->
            <button
              v-if="isLoggedIn"
              @click="handleLogout"
              class="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center lg:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
          >
            <span class="sr-only">Ouvrir le menu</span>
            <!-- Icon when menu is closed -->
            <svg
              v-if="!mobileMenuOpen"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="mobileMenuOpen"
      class="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100"
    >
      <div class="px-3 pt-2 pb-3 space-y-1.5">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block px-3 py-2.5 text-base font-medium tracking-wide transition-all duration-300"
          :class="[$route.path === item.path ? 'text-red-600' : 'text-gray-700 hover:bg-gray-50']"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <!-- Dashboard Link Mobile -->
        <router-link
          v-if="isLoggedIn"
          to="/admin"
          class="block px-3 py-2.5 text-base font-medium tracking-wide transition-all duration-300"
          :class="[$route.path.startsWith('/admin') ? 'text-red-600' : 'text-gray-700 hover:bg-gray-50']"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <!-- Logout Button Mobile -->
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="w-full text-left px-3 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 hover:from-red-700 hover:to-red-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../features/auth/store/auth.store'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const isLoggedIn = ref(false)

const menuItems = [
  { path: '/', name: 'Accueil' },
  { path: '/tickets', name: 'Billetterie' },
  { path: '/contact', name: 'Contact' }
]

async function handleLogout() {
  try {
    await authStore.signOut()
    router.push('/')
    mobileMenuOpen.value = false
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

async function checkAuthStatus() {
  try {
    await authStore.checkAuth()
    isLoggedIn.value = !!authStore.user
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
  }
}

// Vérifier l'état de connexion au chargement et lors des changements
onMounted(checkAuthStatus)
authStore.$subscribe((mutation, state) => {
  isLoggedIn.value = !!state.user
})
</script>
