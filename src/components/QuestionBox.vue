/* eslint-disable vue/valid-v-bind */
<template>
    <div class="box-container">
    <b-jumbotron>
    <template v-slot:lead>
        <div v-html="currentQuestion.question"></div>
    </template>

    <hr class="my-4">

    <b-list-group>
        <b-list-group-item v-for="(answer, index) in shuffleAnswers" :key="index"
        @click="selectAnswer(index)"
        :class="[
            !answered && selectedIndex === index ? 'selected' : 
            answered && currectIndex === index ? 'correct' :
            answered && selectedIndex === index && currectIndex !== index ? 'incorrect' : ''
        ]"
        >
            {{ answer }}
        </b-list-group-item>
    </b-list-group>

    <b-button variant="primary" 
        @click="submitAnswer"
        :disabled="selectedIndex === null || answered"
    >
        Submit
    </b-button>
    <b-button variant="success"
    @click="next"
    :disabled="totalQue == queIndex"
    >
        Next
    </b-button>
  </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    props: {
        currentQuestion: Object,
        next: Function,
        increment: Function,
        totalQue: Number,
        queIndex: Number
    },
    data() {
        return {
            selectedIndex: null,
            shuffleAnswers: [],
            currectIndex: null,
            answered: false
        }
    },
    computed: {
        answers() {
            let answers = [...this.currentQuestion.incorrect_answers]
            answers.push(this.currentQuestion.correct_answer);
            return answers;
        }
    },
    watch: {
        currentQuestion: {
            immediate: true,
            handler() {
                this.selectedIndex = null;
                this.answered = false;
                this.shuffleAnswersData();  
            }
        }
        // currentQuestion() {
        //     this.selectedIndex = null;
        //     this.shuffleAnswersData();
        // }
    },
    methods: {
        selectAnswer(index) {
            this.selectedIndex = index;
            // eslint-disable-next-line no-console
            console.log(index);
        },
        shuffleAnswersData() {
            let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]            
            this.shuffleAnswers = _.shuffle(answers);
            this.currectIndex = this.shuffleAnswers.indexOf( this.currentQuestion.correct_answer);
        },
        submitAnswer() {
            let isCorrect = false;
            if (this.selectedIndex === this.currectIndex) {
                isCorrect = true;
            }

            this.answered = true;
            this.increment(isCorrect);
        }
    }
}
</script>

<style scoped>
.list-group {
    margin-bottom: 20px
}
.list-group-item:hover {
    background-color:#EEE;
    cursor: pointer;
}
.btn {
    margin: 0 10px;
}
.selected {
    background-color: lightblue;
}

.correct {
    background-color: lightgreen;
}

.incorrect {
    background-color: red;
}
</style>