import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useTitle() {
  const route = useRoute()

  const getTitle = (path) => {
    const baseTitle = 'Supercross de Douai'
    const titles = {
      '/': 'Accueil',
      '/tickets': 'Billetterie',
      '/contact': 'Contact',
      '/admin': 'Dashboard'
    }

    const pageTitle = titles[path]
    return pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle
  }

  watch(
    () => route.path,
    (path) => {
      document.title = getTitle(path)
    },
    { immediate: true }
  )
}
