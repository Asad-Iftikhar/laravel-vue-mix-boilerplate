<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';


const store = useStore();
const email = ref('');
const password = ref('');
const submitted = ref(false);

const loggingIn = computed(() => {
  return store.state.authentication.status.loggingIn; // Adjust the module and data path
});

const errors = computed(() => {
  return store.state.authentication.errors; // Adjust the module and data path
});

const handleSubmit = () => {
  submitted.value = true;
  if (email.value && password.value) {
    store.dispatch('authentication/login', { email: email.value, password: password.value })
  }
};

</script>

<template>
  <div class="container">
    <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

            <div class="d-flex justify-content-center py-4">
              <a href="index.html" class="logo d-flex align-items-center w-auto">
                <img src="assets/img/logo.png" alt="">
                <span class="d-none d-lg-block">NiceAdmin</span>
              </a>
            </div><!-- End Logo -->

            <div class="card mb-3">

              <div class="card-body">

                <div class="pt-4 pb-2">
                  <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                  <p class="text-center small">Enter your email & password to login</p>
                </div>

                <form @submit.prevent="handleSubmit" class="row g-3 needs-validation">

                  <div class="col-12">
                    <label for="yourEmail" class="form-label">Email</label>
                    <div class="input-group has-validation ">
                      <span class="input-group-text" id="inputGroupPrepend">@</span>
                      <input type="text" v-model="email" ref="input" name="email" class="form-control" autocapitalize="off" :class="{ 'is-invalid': (submitted && !email) || errors.hasOwnProperty('email') }" id="yourEmail" >
                      <div class="invalid-feedback">{{ (submitted && !email) ? 'Please enter your email!' : errors.email?.[0] }}</div>
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="yourPassword" class="form-label">Password</label>
                    <input type="password" v-model="password" ref="input" name="password" class="form-control" :class="{ 'is-invalid': (submitted && !password) || errors.hasOwnProperty('password') }" id="yourPassword" >
                    <div class="invalid-feedback">{{ (submitted && !password) ? 'Please enter your password!' : errors.password?.[0] }}</div>
                  </div>

                  <div class="col-12">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                      <label class="form-check-label" for="rememberMe">Remember me</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100" type="submit" :disabled="loggingIn">Login</button>
                  </div>
                  <div class="col-12">
                    <p class="small mb-0">Don't have account? <router-link to="/register">Create an account</router-link></p>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  </div>
</template>




<style scoped>
/* Add any scoped styles here if needed */
</style>