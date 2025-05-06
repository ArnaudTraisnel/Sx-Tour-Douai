<template>
  <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 md:gap-16">
        <!-- En-tête -->
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">
            Programme <span class="text-red-600">de la soirée</span>
          </h2>
          
          <div class="text-lg space-y-4">
            <p>Ouverture des portes à 13H30 avec accès exclusif aux paddocks pour les tickets Carré or et VIP</p>
            <p>Ouverture à 18H30 pour les tickets Tribune et Mezzanine</p>
            <p>Food truck, bar et friterie</p>
            <p class="text-red-600 font-bold mt-6">Programme sportif publié le 1er juillet.</p>
          </div>
        </div>
        <!-- Affiche -->
        <div class="max-w-2xl mx-auto">
          <img src="/images/affiche/affiche_supercross_douai.webp" alt="Affiche officielle du Supercross de Douai" class="w-full h-auto rounded-lg shadow-xl"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Programme temporairement commenté
/*
const programme = [
  {
    titre: "Essais libres",
    sessions: [
      { debut: "14:00", fin: "14:10", duree: "0:10", categorie: "Essais libres SX2" },
      { debut: "14:10", fin: "14:20", duree: "0:10", categorie: "Essais libres SX2" },
      { debut: "14:20", fin: "14:30", duree: "0:10", categorie: "Essais libres SX1" },
      { debut: "14:30", fin: "14:40", duree: "0:10", categorie: "Essais libres SX1" },
      { debut: "14:40", fin: "14:50", duree: "0:10", categorie: "Essais libres SX JUNIOR" }
    ]
  },
  {
    titre: "Essais chronos",
    sessions: [
      { debut: "15:00", fin: "15:15", duree: "0:15", categorie: "Essais chronos SX2" },
      { debut: "15:15", fin: "15:30", duree: "0:15", categorie: "Essais chronos SX2" },
      { debut: "15:30", fin: "15:45", duree: "0:15", categorie: "Essais chronos SX1" },
      { debut: "15:45", fin: "16:00", duree: "0:15", categorie: "Essais chronos SX1" },
      { debut: "16:00", fin: "16:15", duree: "0:15", categorie: "Essais chronos SX JUNIOR" }
    ]
  },
  {
    titre: "Demi-finales",
    sessions: [
      { debut: "20:00", fin: "20:20", duree: "0:20", categorie: "Céremonie d'ouverture" },
      { debut: "20:20", fin: "20:30", duree: "0:10", categorie: "SX2 Demi - finale 1 ( 7 min + 1 tour )" },
      { debut: "20:30", fin: "20:40", duree: "0:10", categorie: "SX2 Demi - finale 2 ( 7 min + 1 tour )" },
      { debut: "20:40", fin: "20:50", duree: "0:10", categorie: "SX1 Demi - finale 1 ( 7 min + 1 tour )" },
      { debut: "20:50", fin: "21:00", duree: "0:10", categorie: "SX1 Demi - finale 2 ( 7 min + 1 tour )" }
    ]
  },
  {
    titre: "Finales",
    sessions: [
      { debut: "21:15", fin: "21:35", duree: "0:20", categorie: "Finale SX JUNIOR ( 8 min + 1 tour ) + 1 tour de reconnaissance + podium" },
      { debut: "21:35", fin: "21:40", duree: "0:05", categorie: "Repechage SX2 ( 4 min + 1 tour )" },
      { debut: "21:45", fin: "21:50", duree: "0:05", categorie: "Repechage SX1 ( 4 min + 1 tour )" },
      { debut: "22:00", fin: "22:20", duree: "0:20", categorie: "Finale SX2 ( 9 min + 1 tour ) + 1 tour de reconnaissance + podium" },
      { debut: "22:20", fin: "22:40", duree: "0:20", categorie: "Finale SX1 ( 9 min + 1 tour ) + 1 tour de reconnaissance + podium" }
    ]
  }
]
*/
</script>

<style scoped>
</style>
