<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Login</h2>
            <v-form @submit.native="login" v-model="valid" ref="loginForm">
                <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :loading="loading"
                    label="Username"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    name="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="show ? 'text' : 'password'"
                    :loading="loading"
                    label="Password"
                    value
                    class="input-group--focused"
                    @click:append="show = !show"
                ></v-text-field>

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        :loading="loading"
                        color="success"
                        class="mr-4"
                        width="300"
                        >Login</v-btn
                    >
                </v-container>
                <v-divider></v-divider>
            </v-form>
            <p class="text">
                Don't have an account?
                <router-link class="text-link" to="/register"
                    >Register</router-link
                >
            </p>
        </v-row>
    </div>
</template>

<script>
import { loginSuccess } from '../authState';
import { mapActions } from 'vuex';

export default {
    name: 'login',
    data() {
        return {
            loading: false,
            valid: true,
            show: false,
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v =>
                    (v && v.length >= 3) ||
                    'Username must be at least 3 characters'
            ],
            password: '',
            passwordRules: {
                required: v => !!v || 'Password is required.',
                min: v =>
                    v.length >= 6 || 'Password must be at least 6 characters'
            }
        };
    },
    methods: {
        ...mapActions([loginSuccess]),
        async login(ev) {
            ev.preventDefault();
            try {
                this.loading = true;
                await this[loginSuccess]({
                    username: this.username,
                    password: this.password
                });
                this.loading = false;
            } catch (err) {
                this.loading = false;
                this.$refs.loginForm.reset();
            }
        }
    }
};
</script>

<style scoped>
.actions {
    margin-bottom: 15px;
}
.text {
    margin-top: 15px;
}
.wrraper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    border-radius: 0.5em;
    box-shadow: 0 0 1em gray;
    padding: 40px 50px;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.95);
}
h2 {
    margin-bottom: 40px;
}
.text-link {
    color: blue !important;
}
</style>
