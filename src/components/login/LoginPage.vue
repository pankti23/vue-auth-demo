<template>
  <div class="login-sec">
    <h2>Login</h2>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username"  class="form-control"        
                v-model.trim="$v.form.username.$model"
                 @blur="$v.form.username.$touch()"
                :class="{'is-invalid': $v.form.username.$error, 'is-valid':!$v.form.username.$invalid}" 
            />
            <div class="valid-feedback">
                Your username is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.form.username.required">
                    User name is required.
                </span>
                <span v-if="!$v.form.username.minLength">
                    User name must be at least {{$v.form.username.$params.minLength.min}} characters.
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="username" class="form-control"         
                v-model.trim="$v.form.password.$model"
                @blur="$v.form.password.$touch()"
                :class="{'is-invalid': $v.form.password.$error, 'is-valid':!$v.form.password.$invalid}" 
            />
            <div class="valid-feedback">
                Your password is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.form.password.required">
                    Password is required.
                </span>
                <span v-if="!$v.form.password.minLength">
                    Password must be at least {{$v.form.password.$params.minLength.min}} characters.
                </span>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Login</button>
            <router-link to="/register" class="btn btn-link">Register</router-link>
        </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { router } from "./../../helpers";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      submitted: false
    };
  },
  computed: {
        ...mapState('auth')
    },
    created () {
        // reset login status
        this.logout();
        // eslint-disable-next-line no-console
        console.log(process.env.VUE_APP_TITLE);
        
    },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
          required,
          minLength: minLength(6)
      }
    }
  },
  methods: {
      ...mapActions('auth', ['login', 'logout']),
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.submitted = true;
      this.login(this.form ).then((res) => {
        console.log(res.user);
        router.push('/');
      });   
    }
  }
};
</script>