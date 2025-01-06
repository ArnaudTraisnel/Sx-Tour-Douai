<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import { useStatsStore } from './features/admin/store/stats.store'
import { useTitle } from '@/composables/useTitle'

const route = useRoute()
const statsStore = useStatsStore()

const showFooter = computed(() => {
  return !route.path.startsWith('/admin')
})

useTitle()

onMounted(async () => {
  if (!route.path.startsWith('/admin')) {
    await statsStore.recordVisit()
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navigation />
    <main class="flex-grow">
      <Suspense>
        <router-view v-slot="{ Component }">
          <keep-alive include="Home">
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <template #fallback>
          <div class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </template>
      </Suspense>
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<style lang="scss" src="@/assets/styles/main.scss"></style>
