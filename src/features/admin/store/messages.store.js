import { defineStore } from 'pinia'
import supabase from '@/services/supabase'
import { sendEmail } from '@/services/emailService'

const mockMessages = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    subject: 'Question sur l\'événement',
    content: 'Bonjour, je voudrais savoir si l\'événement débutera bien à 19h comme prévu. J\'ai prévu de venir avec ma famille et nous devons organiser notre soirée. Merci d\'avance pour votre réponse.',
    preview: 'Bonjour, je voudrais savoir si...',
    date: '2025-01-02T14:35:00',
    read: false
  },
  {
    id: 2,
    name: 'Marie Lambert',
    email: 'marie.lambert@example.com',
    subject: 'Réservation de groupe',
    content: 'Bonjour, nous sommes une association de 15 personnes et nous souhaiterions participer à l\'événement. Est-il possible d\'avoir un tarif de groupe ? Nous aimerions aussi savoir si un espace nous sera réservé.',
    preview: 'Bonjour, nous sommes une association...',
    date: '2025-01-02T10:15:00',
    read: true
  },
  {
    id: 3,
    name: 'Thomas Martin',
    email: 'thomas.martin@example.com',
    subject: 'Accessibilité PMR',
    content: 'Bonjour, je me permets de vous contacter concernant l\'accessibilité pour les personnes à mobilité réduite. Y a-t-il des aménagements spécifiques prévus ? Merci de votre retour.',
    preview: 'Bonjour, je me permets de vous contacter...',
    date: '2025-01-01T16:45:00',
    read: false
  },
  {
    id: 4,
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    subject: 'Demande de partenariat',
    content: 'Bonjour, je représente une entreprise locale et nous serions intéressés pour devenir partenaire de votre événement. Pourrions-nous échanger à ce sujet ? Bien cordialement.',
    preview: 'Bonjour, je représente une entreprise...',
    date: '2025-01-01T09:20:00',
    read: true
  },
  {
    id: 5,
    name: 'Lucas Petit',
    email: 'lucas.petit@example.com',
    subject: 'Question sur le programme',
    content: 'Bonsoir, j\'aimerais avoir plus de détails sur le programme de la soirée. Y aura-t-il des animations spécifiques ? Des stands de restauration ? Merci d\'avance pour ces précisions.',
    preview: 'Bonsoir, j\'aimerais avoir plus de détails...',
    date: '2024-12-31T18:30:00',
    read: false
  },
  {
    id: 6,
    name: 'Emma Rousseau',
    email: 'emma.rousseau@example.com',
    subject: 'Bénévolat',
    content: 'Bonjour, je souhaiterais participer en tant que bénévole à votre événement. Quelles sont les conditions et les missions proposées ? Je suis disponible tout le week-end.',
    preview: 'Bonjour, je souhaiterais participer...',
    date: '2024-12-31T15:10:00',
    read: true
  },
  {
    id: 7,
    name: 'Alexandre Moreau',
    email: 'alexandre.moreau@example.com',
    subject: 'Stationnement',
    content: 'Bonjour, je viens de loin pour l\'événement et je m\'inquiète pour le stationnement. Y a-t-il un parking dédié ? Si oui, quelle est sa capacité ? Merci de votre réponse.',
    preview: 'Bonjour, je viens de loin pour...',
    date: '2024-12-30T11:25:00',
    read: false
  },
  {
    id: 8,
    name: 'Julie Bernard',
    email: 'julie.bernard@example.com',
    subject: 'Annulation réservation',
    content: 'Bonjour, je suis navrée mais je dois annuler ma réservation pour cause de maladie. Est-il possible d\'être remboursée ? Je vous remercie de votre compréhension.',
    preview: 'Bonjour, je suis navrée mais...',
    date: '2024-12-30T09:45:00',
    read: true
  },
  {
    id: 9,
    name: 'Pierre Durand',
    email: 'pierre.durand@example.com',
    subject: 'Suggestion',
    content: 'Bonjour, suite à ma participation l\'année dernière, j\'aurais quelques suggestions d\'amélioration à vous proposer. Serait-il possible d\'en discuter ? Cordialement.',
    preview: 'Bonjour, suite à ma participation...',
    date: '2024-12-29T14:15:00',
    read: false
  },
  {
    id: 10,
    name: 'Claire Lefebvre',
    email: 'claire.lefebvre@example.com',
    subject: 'Demande presse',
    content: 'Bonjour, je suis journaliste pour le journal local et je souhaiterais réaliser un article sur votre événement. Pourrions-nous prévoir une interview ? Merci d\'avance.',
    preview: 'Bonjour, je suis journaliste pour...',
    date: '2024-12-29T10:30:00',
    read: true
  }
]

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    loading: false,
    error: null
  }),

  getters: {
    unreadCount: (state) => state.messages.filter(m => !m.read).length,
    sortedMessages: (state) => {
      return [...state.messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  },

  actions: {
    async fetchMessages() {
      this.loading = true
      try {
        console.log('Récupération des messages...')
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erreur Supabase lors de la récupération:', error)
          throw error
        }

        console.log('Messages récupérés:', data)
        this.messages = data
        this.error = null
      } catch (error) {
        console.error('Error fetching messages:', error)
        this.error = 'Erreur lors du chargement des messages'
      } finally {
        this.loading = false
      }
    },

    async addMessage(message) {
      try {
        console.log('Tentative d\'ajout du message:', message)
        const { data, error } = await supabase
          .from('messages')
          .insert([{
            sender: message.name,
            email: message.email,
            subject: message.subject,
            content: message.content,
            status: 'unread',
            created_at: new Date().toISOString()
          }])
          .select()

        if (error) {
          console.error('Erreur Supabase lors de l\'ajout:', error)
          throw error
        }

        console.log('Message ajouté avec succès:', data)
        // Ajouter le nouveau message au state
        if (data && data[0]) {
          this.messages.unshift(data[0])
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du message:', error)
        throw error
      }
    },

    async updateMessageStatus(messageId, status) {
      try {
        const { error } = await supabase
          .from('messages')
          .update({ status })
          .eq('id', messageId)

        if (error) throw error

        // Mettre à jour le message dans le state
        const index = this.messages.findIndex(m => m.id === messageId)
        if (index !== -1) {
          this.messages[index].status = status
        }
      } catch (error) {
        console.error('Error updating message status:', error)
        throw error
      }
    },

    async deleteMessage(messageId) {
      try {
        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', messageId)

        if (error) throw error

        // Supprimer le message du state
        this.messages = this.messages.filter(m => m.id !== messageId)
      } catch (error) {
        console.error('Error deleting message:', error)
        throw error
      }
    }
  }
})
