<template>
    <div class="chat-room">
        <!-- Encabezado -->
        <header class="chat-header">
            <h1>Sala de Chat</h1>
            <div v-if="username">
                <p>Usuario: {{ username }}</p>
            </div>
            <div v-else>
                <UsernameInput :username="username" />
            </div>
        </header>

        <!-- Lista de mensajes -->
        <MessageList :messages="messages" :username="username" />

        <!-- Campo de entrada para nuevos mensajes -->
        <MessageInput @send="sendMessage" v-if="username" />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MessageList from './MessageList.vue';
import UsernameInput from './UsernameInput.vue';
import MessageInput from './MessageInput.vue';


export default {
    name: 'ChatRoom',
    components: { MessageList, MessageInput, UsernameInput },
    computed: {
        ...mapState(['messages', 'username', 'usersConnected']),
    },
    methods: {
        ...mapActions(['sendMessage']),
    },
};
</script>

<style lang="scss" scoped>
.chat-room {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #f9f9f9;
    overflow: hidden;

    .chat-header {
        background: #333;
        color: #fff;
        padding: 10px;
        text-align: center;

        h1 {
            margin: 0;
        }

        p {
            margin: 5px 0 0;
            font-size: 14px;
        }
    }
}
</style>