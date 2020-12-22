<template>
  <div class="main-content">
    <h1 class="title">{{ msg }}</h1>
    <h1>Firstname : {{firstname}}</h1>
    <h1>Lastname : {{lastname}}</h1>
    <h1>{{mydetails()}}</h1>
    <h1>{{fullname}}</h1>
    <input type="text" v-model = "firstname">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      firstname : "Ria",
      lastname  : "Singh",
      address   : "Mumbai",
      fullname  : ''
    }
  },
  methods: {
      mydetails : function() {
        return "I am " + this.firstname + " " + this.lastname;
      }
  },
  watch: {
    firstname: function() {
      this.fullname = this.firstname + " " + this.lastname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import 'HelloWorld.scss';
</style>
