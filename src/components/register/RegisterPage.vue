<template>
    <div class="register-sec">
        <h2>Register</h2>
        <form @submit.prevent="onSubmit">
        <div class="form-group">
            <label for="firstname">Firstname</label>
            <input type="text" id="firstname"  class="form-control"        
                v-model.trim="$v.user.first_name.$model"
                 @blur="$v.user.first_name.$touch()"
                :class="{'is-invalid': $v.user.first_name.$error, 'is-valid':!$v.user.first_name.$invalid}" 
            />
            <div class="valid-feedback">
                Your First Name is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.user.first_name.required">
                    First Name is required.
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="lastname">Lastname</label>
            <input type="text" id="lastname"  class="form-control"        
                v-model.trim="$v.user.last_name.$model"
                 @blur="$v.user.last_name.$touch()"
                :class="{'is-invalid': $v.user.last_name.$error, 'is-valid':!$v.user.last_name.$invalid}" 
            />
            <div class="valid-feedback">
                Your Last Name is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.user.last_name.required">
                    Last Name is required.
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="username">Email</label>
            <input type="text" id="username"  class="form-control"        
                v-model.trim="$v.user.email.$model"
                 @blur="$v.user.email.$touch()"
                :class="{'is-invalid': $v.user.email.$error, 'is-valid':!$v.user.email.$invalid}" 
            />
            <div class="valid-feedback">
                Your Email is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.user.email.required">
                    Email is required.
                </span>
                <span v-if="!$v.user.email.email">
                    Please enter a valid email address
                </span>
            </div>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" class="form-control"         
                v-model.trim="$v.user.password.$model"
                @blur="$v.form.password.$touch()"
                :class="{'is-invalid': $v.user.password.$error, 'is-valid':!$v.user.password.$invalid}" 
            />
            <div class="valid-feedback">
                Your password is valid
            </div>
            <div class="invalid-feedback">
                <span v-if="!$v.user.password.required">
                    Password is required.
                </span>
                <span v-if="!$v.user.password.minLength">
                    Password must be at least {{$v.user.password.$params.minLength.min}} characters.
                </span>
            </div>
        </div>
        <div class="form-group">            
            <button class="btn btn-primary">Register</button>
            <router-link to="/login" class="btn btn-link">Login</router-link>
        </div>
    </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    data () {
        return {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    validations: {
    user: {
      email: {
        required,
        email
      },
      first_name: {
        required        
      },
      last_name: {
        required
      },
      password: {
          required,
          minLength: minLength(8)
      }
    }
  },
  methods: {
      ...mapActions('auth', ['register']),
    onSubmit() {
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      this.submitted = true;
      this.register(this.user);
    }
  }
};
</script>