<template>
  <div id="app" class="main-sec">
    <Header />
     <div class="container">
       <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
      totalQue: 9
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
    next() {
      this.index++;
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++;
      }
      this.numTotal++;
    },
     ...mapActions({
            clearAlert: 'alert/clear' 
        })
  },
  computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    watch: {
        $route (){
            // clear alert on location change
            this.clearAlert();
        }
    },
  mounted: function() {
    fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium', {
      method: 'get'
    })
    .then((response) => { 
      return response.json(); 
    })
    .then((jsonData) => {
      this.questions = jsonData.results;  
    });
  }
}
</script>
