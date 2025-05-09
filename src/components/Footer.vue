<template>
  <footer class="footer-gradient">
    <div class="container mx-auto px-4 py-16">
      <div class="flex flex-col items-center justify-center space-y-10">
        <!-- Logo et Description -->
        <div class="text-center max-w-2xl">
          <h2 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500 mb-3">
            SX Tour Douai
          </h2>
          <p class="text-gray-400 text-lg font-light">
            L'événement incontournable de supercross en France
          </p>
        </div>

        <!-- Réseaux sociaux -->
        <div class="flex flex-col items-center space-y-6">
          <h3 class="text-xl font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">Suivez-nous</h3>
          <div class="flex items-center space-x-8">
            <a href="https://www.facebook.com/profile.php?id=61573798620644" class="social-icon-link group" target="_blank" rel="noopener noreferrer">
              <div class="social-icon-bg"></div>
              <svg class="w-6 h-6 relative z-10 transition-all group-hover:scale-110 group-hover:text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/douaisupercross/" class="social-icon-link group" target="_blank" rel="noopener noreferrer">
              <div class="social-icon-bg"></div>
              <svg class="w-6 h-6 relative z-10 transition-all group-hover:scale-110 group-hover:text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="separator">
          <div class="separator-line"></div>
        </div>

        <!-- Copyright -->
        <div class="text-gray-500 text-sm font-light tracking-wider">
          &copy; {{ currentYear }} SX Tour Douai. Tous droits réservés.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-gradient {
  min-height: 400px; /* Hauteur minimale fixe */
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1));
  color: white;
}

.social-icon-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Dimensions fixes */
  height: 40px; /* Dimensions fixes */
  transition: transform 0.2s;
}

.social-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff4b4b, #ff0000);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}

.social-icon-link:hover .social-icon-bg {
  opacity: 1;
  transform: scale(1);
  background: rgba(220, 38, 38, 0.1);
}

.separator {
  width: 100%;
  height: 1px;
  position: relative;
  padding: 0 20%;
  margin: 1rem 0;
}

.separator-line {
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}

@media (max-width: 640px) {
  .separator {
    padding: 0 10%;
  }
}
</style>
