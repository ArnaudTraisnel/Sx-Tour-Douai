<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-enduro-dark text-white pt-40">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-gray-900 text-4xl md:text-6xl font-bold mb-6">BILLETTERIE</h1>
        <p class="text-slate-600 text-xl max-w-2xl mx-auto">
          Réservez dès maintenant vos places pour le Supercross de Douai
        </p>
      </div>
    </section>

    <!-- Section Billets -->
    <section class="py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <a
            v-for="ticket in tickets"
            :key="ticket.name"
            href="https://www.billetweb.fr/championnat-de-france-de-supercross-2025"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg shadow-lg overflow-hidden flex flex-col h-full min-h-[350px] transition-transform transform hover:scale-105"
          >
            <div :class="ticket.gradientClass" class="flex flex-col justify-between h-full">
              <!-- Section supérieure -->
              <div class="bg-white text-center p-6">
                <h3 :class="['text-2xl md:text-3xl font-bold mb-4', ticket.titleColor]">{{ ticket.name }}</h3>
                <p :class="['text-4xl md:text-5xl font-bold', ticket.titleColor]">{{ ticket.price }}</p>
                <p v-if="ticket.description" class="text-gray-700 mt-2 text-sm md:text-base">
                  {{ ticket.description }}
                </p>
              </div>

              <!-- Section inférieure -->
              <ul class="text-center space-y-3 p-6 text-sm md:text-base">
                <template v-for="(benefit, i) in ticket.benefits" :key="i">
                  <li class="flex items-center justify-center space-x-2">
                    <span>{{ benefit }}</span>
                  </li>
                  <div v-if="i !== ticket.benefits.length - 1" class="h-px w-3/4 mx-auto bg-white/30" />
                </template>
              </ul>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer Spacer -->
    <div class="bg-gray-100 pb-16"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tickets = ref([
  {
    name: 'Mezzanine',
    price: 'À partir de 25€',
    titleColor: 'text-[#0099c6]',
    gradientClass: 'bg-[#0099c6] text-white',
    benefits: [
      "🚪 Ouverture des portes à 18H30.",
      "✍️ Séance de dédicaces à 19H.",
      "⭐ Cérémonie d'ouverture à 19H30.",
      "🎪 Stands partenaires.",
    ],
    description: "Une vue imprenable sur l'événement depuis les hauteurs.",
  },
  {
    name: 'Tribune',
    price: 'À partir de 30€',
    titleColor: 'text-[#66aa00]',
    gradientClass: 'bg-[#66aa00] text-white',
    benefits: [
      "🚪 Ouverture des portes à 18H30.",
      "✍️ Séance de dédicaces à 19H.",
      "⭐ Cérémonie d'ouverture à 19H30.",
      "🎪 Stands partenaires.",
    ],
    description: 'Le meilleur compromis entre confort et visibilité.',
  },
  {
    name: 'Tribune paddock - Carré or',
    price: 'À partir de 50€',
    titleColor: 'text-[#f02b1d]',
    gradientClass: 'bg-[#f02b1d] text-white',
    benefits: [
      "🚗 Parking au plus proche de l'entrée.",
      "🚪 Ouverture des portes à 13H30.",
      "✍️ Séance de dédicaces à 19H.",
      "🏍️ Accès illimité au paddock pilotes.",
      "🚦 Accès exclusif aux essais et qualifications.",
      "🎫 Accès privilégié au circuit.",
    ],
    description: "Au plus près de l'action, une expérience unique.",
  },
  {
    name: 'Tribune paddock - VIP',
    price: 'À partir de 95€',
    titleColor: 'text-[#f02b1d]',
    gradientClass: 'bg-[#f02b1d] text-white',
    benefits: [
      "🚗 Parking au plus proche de l'entrée.",
      "🚪 Ouverture des portes à 13H30.",
      "✍️ Séance de dédicaces à 19H.",
      "🏍️ Accès illimité au paddock pilotes.",
      "🚦 Accès exclusif aux essais et qualifications.",
      "🎫 Accès privilégié au circuit.",
      "🍷 Bar et buffet en espace privatisé.",
    ],
    description: "L'expérience ultime avec service premium.",
  },
])
</script>
