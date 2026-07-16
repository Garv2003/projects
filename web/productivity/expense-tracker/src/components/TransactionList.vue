<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

interface Transaction {
    id: number;
    text: string;
    amount: number;
}

const props = defineProps<{
    transactions: Transaction[];
}>();

const emit = defineEmits(['deleteTransaction']);
const $toast = useToast();


const deleteTransaction = (id: number) => {
    emit('deleteTransaction', id);
    $toast.open({
        message: 'Transaction Deleted',
        type: 'success'
    });
}

</script>

<template>
    <h3>History</h3>
    <ul id="list" class="list">
        <div v-if="props.transactions.length === 0">
            <li>No transactions found</li>
        </div>
        <li v-for="transaction in props.transactions" :key="transaction.id"
            :class="transaction.amount < 0 ? 'minus' : 'plus'">
            {{ transaction.text }} <span>{{ transaction.amount < 0 ? '-' : '+' }}${{ Math.abs(transaction.amount)
                    }}</span>
                    <button class="delete-btn" @click="deleteTransaction(transaction.id)">
                        >x</button>
        </li>
    </ul>
</template>