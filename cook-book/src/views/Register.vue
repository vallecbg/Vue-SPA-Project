
<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Register</h2>
            <v-form @submit.prevent="register" v-model="valid" ref="registerForm">
                <v-text-field v-model="name" :rules="nameRules" label="Full Name"></v-text-field>
                <v-text-field v-model="username" :rules="usernameRules" label="Username"></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
                <v-text-field v-model="city" :rules="cityRules" label="City"></v-text-field>
                <v-text-field v-model="state" :rules="stateRules" label="State/Province/Region"></v-text-field>
                <v-text-field v-model="zip" :rules="zipRules" label="ZIP / Postal Code"></v-text-field>
                <v-autocomplete
                    v-model="country"
                    :rules="countryRules"
                    :items="countries"
                    label="Country"
                ></v-autocomplete>

                <v-text-field
                    v-model="password"
                    name="password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    value
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                    @input="passwordConfirmationRule"
                ></v-text-field>

                <v-text-field
                    v-model="repeatPassword"
                    name="repeatPassword"
                    :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[passwordRules.required, passwordRules.min, passwordConfirmationRule]"
                    :type="showRepeatPassword ? 'text' : 'password'"
                    label="Repeat Password"
                    value
                    class="input-group--focused"
                    @click:append="showRepeatPassword = !showRepeatPassword"
                    @input="passwordConfirmationRule"
                ></v-text-field>

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        width="300"
                        @click="register"
                    >Register</v-btn>
                </v-container>
                <v-divider></v-divider>
            </v-form>
            <p class="text">
                Already registered?
                <router-link to="/login">Sign In</router-link>
            </p>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return {
            countries: [
                'Bulgaria',
                'United Kingdom',
                'United States',
            ],
            valid: true,
            showPassword: false,
            showRepeatPassword: false,
            checkbox: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v =>
                    (v && v.length >= 3) || 'Name must be at least 3 characters'
            ],
            username: '',
            usernameRules: [
                v => !!v || 'Username is required',
                v =>
                    (v && v.length >= 3) ||
                    'Username must be at least 3 characters'
            ],
            email: '',
            emailRules: [
                value => !!value || 'E-mail is required.',
                value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
            ],
            city: '',
            cityRules: [v => !!v || 'City is required'],
            state: '',
            stateRules: [v => !!v || 'State is required'],
            zip: '',
            zipRules: [v => !!v || 'ZIP Code is required'],
            country: '',
            countryRules: [v => !!v || 'Country is required'],
            password: '',
            repeatPassword: '',
            passwordRules: {
                required: v => !!v || 'Password is required.',
                min: v =>
                    v.length >= 6 || 'Password must be at least 6 characters'
            }
        };
    },
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.password === this.repeatPassword || 'Password must match';
        }
    },
    methods: {
        register() {
            if (this.$refs.registerForm.validate()) {
                this.$store.dispatch('userJoin', {
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