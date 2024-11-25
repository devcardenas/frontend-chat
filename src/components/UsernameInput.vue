<template>
    <div class="username-input d-flex align-center">
        <v-text-field v-model="newUsername" type="text" placeholder="Ingresa tu nombre de usuario" variant="outlined"
            density="compact" hide-details class="mx-1"></v-text-field>
        <div class="mx-1">
            <v-btn @click="setUsername">Iniciar Chat</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['username'],
    data() {
        return {
            newUsername: '', // Nombre de usuario ingresado
        };
    },
    methods: {
        setUsername() {
            if (this.newUsername.trim()) {
                this.$store.commit('setUsername', this.newUsername); // Actualizar el nombre de usuario
                this.newUsername = ''; // Limpiar el campo de texto
            } else {
                alert('Por favor ingresa un nombre de usuario.');
            }
        },
    },
};
</script>