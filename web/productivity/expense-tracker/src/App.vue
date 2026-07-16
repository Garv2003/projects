<script setup lang="ts">
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';
import { computed, ref } from 'vue';

let transactions = ref([
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
])

const total = computed(() => {
  return transactions.value.reduce((acc, item) => (acc += item.amount), 0).toFixed(2);
})

const income = computed(() => {
  return transactions.value
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
})

const expense = computed(() => {
  return transactions.value
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
})

const handleTransaction = (transaction: { id: number; text: string; amount: number }) => {
  transactions.value.push(transaction);
}

const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter(transaction => transaction.id !== id);
}

</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpense :income="income" :expense="expense" />
    <TransactionList :transactions="transactions" @deleteTransaction="deleteTransaction" />
    <AddTransaction @addTransaction="handleTransaction" />
  </div>
</template>
