import { createStore } from 'vuex';
import io from 'socket.io-client';

export default createStore({
  state: {
    username: '', // Nombre de usuario
    messages: [], // Lista de mensajes
    socket: null, // Instancia de Socket.IO
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setSocket(state, socketInstance) {
      state.socket = socketInstance;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    initializeSocket({ state, commit }) {
      if (state.username && !state.socket) {
        const socketInstance = io('http://localhost:3000', {
          query: { username: state.username }, // Envía el nombre de usuario al conectar
        });

        // Configura los eventos del socket
        socketInstance.on('message-received', (message) => {
          commit('addMessage', message);
        });

        // Guarda la instancia del socket
        commit('setSocket', socketInstance);

        // Carga los mensajes del chat
        this.dispatch('fetchMessages');
      }
    },
    setUsernameAndInitializeSocket({ commit, dispatch }, username) {
      commit('setUsername', username);
      dispatch('initializeSocket');
    },
    async fetchMessages({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/messages'); // URL del backend
        const messages = await response.json();
        commit('setMessages', messages);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    },
    sendMessage({ state }, content) {
      if (state.socket) {
        const message = {
          username: state.username,
          content,
          timestamp: new Date().toISOString(),
        };
        state.socket.emit('new-message', message);
      }
    },
  },
  getters: {
    getMessages(state) {
      return state.messages;
    },
    getUsername(state) {
      return state.username;
    },
  },
});
