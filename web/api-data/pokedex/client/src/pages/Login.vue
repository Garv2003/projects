<template>
    <Wrapper>
        <div class="register-container">
            <form @submit.prevent="handleSubmit" class="register-form">
                <h2>Login</h2>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <span class="register-link">
                    Don't have an account?
                    <router-link to="/register">Register</router-link>
                </span>
                <button type="submit" class="submit-button">Login</button>
            </form>
        </div>
    </Wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { Wrapper } from '../layouts';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    if (email.value === '' && password.value === '') {
        alert('Please fill in all fields');
        return;
    }
    if (email.value === '') {
        alert('Please enter email');
        return;
    }
    if (password.value === '') {
        alert('Please enter password');
        return;
    }

    try {
        const res = await axios.post(import.meta.env.VITE_SERVER_API + '/auth/login', {
            email: email.value,
            password: password.value
        });

        if (res.data.success) {
            alert('Login successful');
            localStorage.setItem('token', res.data.token);
            router.push('/profile');
        } else {
            alert('Login failed');
        }
    }
    catch (err) {
        console.error(err);
        alert('An error occurred');
    }
};
</script>
