<template>
    <div class="app">
        <Navbar isTab="props.isTab" />
        <div class="content">
            <slot></slot>
        </div>
        <Footer isRoute="false" />
    </div>
</template>

<script setup lang="ts">
import { Navbar, Footer } from '../layouts';
</script>
