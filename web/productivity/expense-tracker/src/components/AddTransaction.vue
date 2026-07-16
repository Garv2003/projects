<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

let text = ref('');
let amount = ref(0);

const $toast = useToast();

const emit = defineEmits(['addTransaction']);

const addTransaction = () => {
    if (text.value.trim() === '' || amount.value === 0) {
        $toast.error('Please enter text and amount');
        return;
    }

    const transaction = {
        id: Math.floor(Math.random() * 100000000),
        text: text.value,
        amount: +amount.value
    }

    emit('addTransaction', transaction);

    text.value = '';
    amount.value = 0;

    $toast.success('Transaction added successfully');
}
</script>


<template>
    <h3>Add New Transaction</h3>
    <form id="form" @submit.prevent="addTransaction">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" placeholder="Enter Text..." v-model="text" />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br /> (Negative - expense , positive -income)</label>
            <input type="number" id="amount" placeholder="Enter amount..." v-model="amount" />
        </div>
        <button class="btn">Add Transaction</button>
    </form>
</template>