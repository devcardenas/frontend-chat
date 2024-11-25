import { createStore } from 'vuex';
import io from 'socket.io-client';

// Conexión con Socket.IO
const socket = io('http://localhost:3000'); // Cambia por tu URL backend si es necesario

export default createStore({
  state: {
    username: /*localStorage.getItem('username') ||*/ '', // Nombre de usuario
    messages: [], // Lista de mensajes,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;

      // Guardamos el nombre de usuario en localStorage para que cuando se recarge la página no se pierda
      //localStorage.setItem('username', username);
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    // Configurar el nombre de usuario
    setUsername({ commit }, username) {
      commit('setUsername', username);
    },

    // Cargar mensajes antiguos desde la API
    async fetchMessages({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/messages'); // URL del backend
        const messages = await response.json();
        commit('setMessages', messages);
      } catch (error) {
        console.error('Error al cargar mensajes:', error);
      }
    },
    // Enviar un mensaje al servidor
    sendMessage({ state }, content) {
      const message = {
        username: state.username,
        content,
        timestamp: new Date().toISOString(),
      };
      socket.emit('new-message', message);
    },

    // Escuchar mensajes en tiempo real desde Socket.IO
    receiveMessage({ commit }) {
      socket.on('message-received', (message) => {
        commit('addMessage', message);
      });
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
