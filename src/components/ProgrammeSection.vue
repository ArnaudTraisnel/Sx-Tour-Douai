<template>
  <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 md:gap-16">
        <!-- En-tête -->
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">
            Programme <span class="text-red-600">de la soirée</span>
          </h2>
        </div>

        <!-- Timeline -->
        <div class="max-w-5xl mx-auto w-full space-y-12">
          <div v-for="(groupe, groupeIndex) in programme" :key="groupeIndex" 
               class="relative">
            <!-- Ligne verticale de timeline -->
            <div class="absolute left-0 top-0 bottom-0 w-px bg-red-200 hidden md:block"></div>
            
            <!-- Titre du groupe -->
            <div class="relative md:ml-8 mb-6">
              <div class="absolute -left-3 top-1/2 w-6 h-6 -mt-3 rounded-full bg-red-600 hidden md:block"></div>
              <h3 class="text-2xl md:text-3xl font-bold text-red-600 pl-0 md:pl-6">
                {{ groupe.titre }}
              </h3>
            </div>
            
            <!-- Sessions -->
            <div class="md:ml-8 space-y-4">
              <div v-for="(session, sessionIndex) in groupe.sessions" 
                   :key="sessionIndex"
                   class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div class="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 gap-4">
                  <!-- Horaire -->
                  <div class="flex-shrink-0 w-full sm:w-48 md:w-56">
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div class="text-base md:text-lg font-semibold">
                        {{ session.debut }} - {{ session.fin }}
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 mt-1 ml-7">
                      Durée: {{ session.duree }}
                    </div>
                  </div>
                  
                  <!-- Séparateur vertical -->
                  <div class="hidden sm:block w-px h-12 bg-gray-200"></div>
                  
                  <!-- Catégorie -->
                  <div class="flex-grow">
                    <div class="text-base md:text-lg">
                      {{ session.categorie }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
</script>

<style scoped>
</style>
