<template>
    <div class="wrraper">
        <v-row align="center" class="card">
            <h2>Add Article</h2>
            <v-form
                @submit.prevent="createArticle"
                v-model="valid"
                ref="createForm"
            >
                <v-text-field
                    v-model="title"
                    :rules="titleRules"
                    label="Title"
                ></v-text-field>

                <vue-editor class="link" v-model="content" />

                <v-row>
                    <v-file-input
                        v-model="image"
                        accept="image/png, image/jpeg"
                        label="Add Image..."
                        prepend-icon="mdi-camera"
                        :rules="imageRules"
                        :loading="loading"
                        @change.native="handleFileChange($event)"
                    ></v-file-input>
                    <v-btn
                        class="ma-2"
                        dark
                        color="green"
                        :loading="loading"
                        @click="upload"
                    >
                        <v-icon left dark>mdi-cloud-upload</v-icon>Upload
                    </v-btn>
                </v-row>

                <div v-show="showProgress">
                    <v-progress-linear :value="progress"></v-progress-linear>
                </div>

                <v-container class="actions">
                    <v-btn
                        type="submit"
                        :disabled="!valid"
                        :loading="loading"
                        color="success"
                        class="mr-4"
                        width="100%"
                        >Add Article</v-btn
                    >
                </v-container>
                <v-divider></v-divider>
            </v-form>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { createArticle } from '../blogState';
import { VueEditor } from 'vue2-editor';
export default {
    name: 'AddArticle',
    components: {
        VueEditor
    },
    data() {
        return {
            valid: true,
            loading: false,
            title: '',
            titleRules: [
                v => !!v || 'Title is required',
                v =>
                    (v && v.length >= 3) ||
                    'Title must be at least 3 characters'
            ],
            content: '<h1>Some initial content</h1>',
            image: null,
            imageRules: [
                value => !!value || 'Image is required',
                value =>
                    !value ||
                    value.size < 2000000 ||
                    'Image size should be less than 2 MB!'
            ],
            filesSelected: 0,
            results: null,
            cloudName: 'vallec',
            preset: 'mu67xa8b',
            formData: null,
            fileContents: null,
            progress: 0,
            showProgress: false,
            file: null
        };
    },
    methods: {
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

        ...mapActions([createArticle]),
        async createArticle() {
            if (this.results) {
                this.loading = true;
                await this[createArticle]({
                    title: this.title,
                    content: this.content,
                    imageUrl: this.results.secure_url,
                    creator: localStorage.getItem('userId')
                });
                this.loading = false;
                this.$router.push('/', () => {});
            } else {
                alert('Upload the image!');
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
.link {
    text-decoration: none !important;
    color: #000 !important;
}
</style>
