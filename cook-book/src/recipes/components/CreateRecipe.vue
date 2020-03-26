<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Create Recipe</h2>
            <v-form @submit.prevent="createRecipe" v-model="valid" ref="loginForm">
                <v-text-field v-model="title" :rules="titleRules" label="Title"></v-text-field>
                <v-autocomplete
                    v-model="category"
                    :rules="categoryRules"
                    :items="categories"
                    label="Category"
                ></v-autocomplete>
                <v-autocomplete
                    v-model="subCategory"
                    :rules="subCategoryRules"
                    :items="subCategories"
                    label="Subcategory"
                ></v-autocomplete>

                <v-text-field
                    v-model.number="prepTime"
                    :rules="timeRules"
                    type="number"
                    label="Prep Time (hours)"
                />
                <v-text-field
                    v-model.number="cookTime"
                    :rules="timeRules"
                    type="number"
                    label="Cook Time (hours)"
                />
                <v-text-field
                    v-model.number="servings"
                    :rules="timeRules"
                    type="number"
                    label="Number of servings"
                />

                <div
                    v-for="(ingredient, ingIndex) in ingredients"
                    :key="`${ingIndex}-${ingredient}`"
                >
                    <v-row>
                        <v-text-field
                            v-model="ingredient.value"
                            :rules="ingredientRules"
                            label="Ingredient"
                        ></v-text-field>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                            @click="removeIngredient(ingIndex)"
                        >
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-row>
                </div>
                <v-btn class="ma-2" dark color="green" @click="addIngredient">
                    <v-icon left dark>mdi-plus</v-icon>Ingredient
                </v-btn>

                <div v-for="(step, stepIndex) in steps" :key="stepIndex+99">
                    <v-row>
                        <v-text-field v-model="step.value" :rules="stepRules" label="Step"></v-text-field>
                        <v-btn
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                            @click="removeStep(stepIndex)"
                        >
                            <v-icon dark>mdi-minus</v-icon>
                        </v-btn>
                    </v-row>
                </div>
                <v-btn class="ma-2" dark color="green" @click="addStep">
                    <v-icon left dark>mdi-plus</v-icon>Step
                </v-btn>

                <v-row>
                    <v-file-input
                        v-model="image"
                        accept="image/png, image/jpeg"
                        label="Add Image..."
                        prepend-icon="mdi-camera"
                        :rules="imageRules"
                        @change.native="handleFileChange($event)"
                    ></v-file-input>
                    <v-btn class="ma-2" dark color="green" @click="upload">
                        <v-icon left dark>mdi-cloud-upload</v-icon>Upload
                    </v-btn>
                </v-row>

                <div v-show="showProgress">
                    <progress-bar :options="options" :value="progress" />
                </div>

                <v-textarea
                    v-model="description"
                    :rules="descriptionRules"
                    label="Description"
                    counter="350"
                />

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        width="300"
                        @submit="createRecipe"
                    >Create Recipe</v-btn>
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
//TODO: fix the categories and subcategories to call them from an API
//TODO: add more categories and subcategories

//TODO: extract the upload method in separate file (optional)
//TODO: add multiple images (optional)
import { http } from '../../shared/services/httpClient';
import axios from 'axios';
import ProgressBar from 'vuejs-progress-bar';

export default {
    name: 'CreateRecipe',
    components: {
        ProgressBar
    },
    data() {
        const progressBarOptions = {
            text: {
                shadowColor: 'black',
                fontSize: 14,
                fontFamily: 'Helvetica',
                dynamicPosition: true
            },
            progress: {
                color: '#E8C401',
                backgroundColor: '#000000'
            },
            layout: {
                height: 35,
                width: 140,
                type: 'line',
                progressPadding: 0,
                verticalTextAlign: 63
            }
        };
        return {
            valid: true,
            title: '',
            titleRules: [
                v => !!v || 'Title is required',
                v =>
                    (v && v.length >= 3) ||
                    'Title must be at least 3 characters'
            ],
            categories: ['Soups', 'With Meat', 'Супи : Чорби и супи'],
            category: '',
            categoryRules: [v => !!v || 'Category is required'],
            subCategories: ['Soups', 'With Meat', 'Супи : Чорби и супи'],
            subCategory: '',
            subCategoryRules: [v => !!v || 'Sub Category is required'],
            prepTime: null,
            cookTime: null,
            servings: null,
            timeRules: [
                v => !!v || 'This field is required',
                v => (v && v > 0) || 'Must be more than 0'
            ],
            ingredients: [],
            ingredientRules: [v => !!v || 'Ingredient is required'],
            steps: [],
            stepRules: [v => !!v || 'Step is required'],

            image: null,
            imageRules: [
                value =>
                    !value ||
                    value.size < 2000000 ||
                    'Image size should be less than 2 MB!'
            ],

            description: '',
            descriptionRules: [
                v => !!v || 'This field is required',
                v => v.length <= 350 || 'Max 350 characters',
            ],

            filesSelected: 0,
            results: null,
            cloudName: 'vallec',
            preset: 'mu67xa8b',
            formData: null,
            fileContents: null,
            progress: 0,
            showProgress: false,
            options: progressBarOptions,
            file: null
        };
    },
    methods: {
        addIngredient: function() {
            this.ingredients.push({ value: '' });
        },
        removeIngredient: function(ingIndex) {
            this.ingredients.splice(ingIndex, 1);
        },
        addStep: function() {
            this.steps.push({ value: '' });
        },
        removeStep: function(stepIndex) {
            this.steps.splice(stepIndex, 1);
        },
        handleFileChange: function(event) {
            this.file = event.target.files[0];
            this.filesSelected = event.target.files.length;
        },
        prepareFormData: function() {
            this.formData = new FormData();
            this.formData.append('upload_preset', this.preset);
            // this.formData.append('tags', this.tags); // Optional - add tag for image admin in Cloudinary
            this.formData.append('file', this.fileContents);
        },

        upload: function() {
            let reader = new FileReader();
            // attach listener to be called when data from file
            reader.addEventListener(
                'load',
                function() {
                    this.fileContents = reader.result;
                    this.prepareFormData();
                    let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
                    let requestObj = {
                        url: cloudinaryUploadURL,
                        method: 'POST',
                        data: this.formData,
                        onUploadProgress: function(progressEvent) {
                            console.log('progress', progressEvent);
                            this.progress = Math.round(
                                (progressEvent.loaded * 100.0) /
                                    progressEvent.total
                            );
                            console.log(this.progress);
                            //bind "this" to access vue state during callback
                        }.bind(this)
                    };
                    //show progress bar at beginning of post
                    this.showProgress = true;
                    axios(requestObj)
                        .then(response => {
                            this.results = response.data;
                            console.log(this.results);
                            console.log('public_id', this.results.public_id);
                        })
                        .catch(error => {
                            this.errors.push(error);
                            console.log(this.error);
                        })
                        .finally(() => {
                            setTimeout(
                                function() {
                                    this.showProgress = false;
                                }.bind(this),
                                1000
                            );
                        });
                }.bind(this),
                false
            );
            // call for file read if there is a file
            if (this.file && this.file.name) {
                reader.readAsDataURL(this.file);
            }
        },
        createRecipe() {
            if (this.results) {
                const recipe = {
                    title: this.title,
                    description: this.description,
                    category: this.category,
                    subCategory: this.subCategory,
                    prepTime: this.prepTime,
                    cookTime: this.cookTime,
                    servings: this.servings,
                    ingredients: this.ingredients,
                    steps: this.steps,
                    imageUrl: this.results.secure_url,
                    creator: localStorage.getItem('userId')
                };

                http.post('recipes', recipe).then(() => {
                    this.$router.push('/');
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
