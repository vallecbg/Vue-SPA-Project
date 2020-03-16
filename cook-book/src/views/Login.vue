
<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Login</h2>
            <v-form @submit.prevent="login" v-model="valid" ref="loginForm">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
                <v-text-field
                    v-model="password"
                    name="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    value
                    class="input-group--focused"
                    @click:append="show = !show"
                ></v-text-field>

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        width="300"
                        @submit="login"
                    >Login</v-btn>
                </v-container>
                <v-divider></v-divider>
            </v-form>
            <p class="text">
                Don't have an account?
                <router-link to="/register">Register</router-link>
            </p>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            valid: true,
            show: false,
            checkbox: false,
            email: '',
            emailRules: [
                value => !!value || 'E-mail is required.',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
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
        login() {
            if (this.$refs.loginForm.validate()) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
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
</style>