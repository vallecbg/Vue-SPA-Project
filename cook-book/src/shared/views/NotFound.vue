<template>
    <main class="container my-5">
        <div class="row">
            <div class="col-12 text-center my-3">
                <h1 class="mb-3 display-3 text-uppercase">Oops!</h1>
                <h2 class="mb-3 display-3 text-uppercase">404 Not found</h2>
                <h3>Sorry, an error has occured, Requested page not found!</h3>
                <router-link to="/">
                    <v-btn dark color="blue"
                        ><v-icon left dark>home</v-icon>Take me Home!</v-btn
                    >
                </router-link>
            </div>
        </div>
    </main>
</template>
<script>
export default {};
</script>
