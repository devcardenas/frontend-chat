<template>
    <v-container class="p-2">
        <v-row align="center" class="message-input align-center">
            <v-text-field v-model="newMessage" @keyup.enter="sendMessage" label="Escribe un mensaje..."
                variant="outlined" density="compact" hide-details class="px-1"></v-text-field>
            <v-btn color="primary" @click="sendMessage" class="px-1">
                Enviar
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            newMessage: '', // Nuevo mensaje
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim()) {
                this.$emit('send', this.newMessage); // Emitir el mensaje al componente padre
                this.newMessage = ''; // Limpiar el campo de texto
            }
        },
    },
};
</script>