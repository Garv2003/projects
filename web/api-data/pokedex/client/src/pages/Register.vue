<template>
    <Wrapper>
        <div class="register-container">
            <form @submit.prevent="handleSubmit" class="register-form">
                <h2>Register</h2>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="name" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>
                <span style="display: block; margin-bottom: 15px; font-size: 14px; color: #fff;">
                    Already have an account? <router-link to="/login"
                        style="color: red; text-decoration: underline;">Login</router-link>
                </span>
                <button type="submit" class="submit-button">Register</button>
            </form>
        </div>
    </Wrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { Wrapper } from '../layouts';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleSubmit = async () => {
    if (name.value === '' && email.value === '' && password.value === '' && confirmPassword.value === '') {
        alert('Please fill in all fields');
        return;
    }
    if (name.value === '') {
        alert('Please enter name');
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
    if (confirmPassword.value === '') {
        alert('Please confirm password');
        return;
    }
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }
    try {
        const response = await axios.post(import.meta.env.VITE_SERVER_API + '/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        alert(response.data.message);
        router.push('/login');
    } catch (error) {
        alert('An error occurred');
    }
};
</script>
