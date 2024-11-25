<template>
    <v-container class="py-2 message-list" fluid>
        <v-row dense>
            <v-col v-for="(msg, index) in messages" :key="index" cols="12">
                <v-card :class="msg.username === username ? 'green' : 'grey'" class="pa-1">
                    <v-card-text class="d-flex flex-column py-0 px-0" :class="msg.username === username ? 'sent' : 'received'">
                        <span>
                            <strong>{{ msg.username }}:</strong> {{ msg.content }}
                        </span>
                    </v-card-text>
                    <v-card-subtitle :class="msg.username === username ? 'sent' : 'received'" class="px-0 timestamp">
                        <span class="">
                            {{ formatTimestamp(msg.timestamp) }}
                        </span>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        messages: Array,
        username: String,
    },
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('hh:mm a');
        },
    },
};
</script>

<style scoped>
.message-list {
    height: 100%;
    /* Ajuste para scroll completo */
    overflow-y: auto;
}

.sent {
    text-align: right;
    /* Mensajes enviados */
}

.received {
    text-align: left;
    /* Mensajes recibidos */
}

.green{
    background-color: #134e37 !important;
    color:  white
}

.grey{
    background-color: #242626 !important;
    color: white
}

.timestamp{
    font-size: 12px;
}
</style>