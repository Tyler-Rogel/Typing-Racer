const SENTENCES = [
    "The quick brown fox jumped over the fence.",
    "It's been over a fence, I'm starting to think that tractor is never coming back.",
    "What do you believe to be the answer to my problems?",
]
Vue.component('test-button', {
    props: {
        pressfunction: Function,
        getsentence: String
    },
    template: `<button @click="pressfunction">Reset test with {{ getsentence }} Sentence</button>`,
    data: function () {return {}},
    methods: {},
})
var app = new Vue({
    el: "#app",
    data:{
        currentSentence: '',
        userSentence: '',
        startTime: 0,
        
        time: 0,
        racing: false,
    },
    methods:{
        startRace: function () {
            if(!this.racing){
            // let current = new Date();
            // this.startTime = current.getSeconds + ":" + current.getMilliseconds();
            this.startTime = Date.now();
            this.racing = true;
            }
        },
        getRandomSentence: function () {
            let i = Math.floor(Math.random() * SENTENCES.length);
            this.currentSentence = SENTENCES[i];
            console.log(i, this.currentSentence);

        },
        calculateTotalTime: function () {
            // let current = new Date();
            // this.stopTime = current.getSeconds + ":" + current.getMilliseconds();
            // this.time = this.stopTime - this.startTime;
            this.time = (Date.now() - this.startTime)/1000;
            this.racing = false;
        },

        resetTest: function () {
            this.startTime = 0;
            this.userSentence = '';
            this.racing = false;
        },
        resetWithNewSentence: function () {
            this.startTime = 0;
            this.currentSentence = '';
            this.userSentence = '';
            this.getRandomSentence();
            this.racing = false;
        }
    },
    computed: {
        // this function runs whenever the sentence the user is typing changes
        // use it like a variable (v-if="finishedTyping")
        finishedTyping: function () {
            // you probably wanna use your variable here in place of these awful ones
            if (this.currentSentence == this.userSentence) {
                this.calculateTotalTime();
                return true;
            } else {
                return false;
            }
        }
    },
    created: function () {
        this.getRandomSentence();
    }
});
/*
extra cool additions:
 - Keep a high score that stays between attempts
 - Let the user pick the sentence that they will be typing
 - Show a timer on the screen as they are typing
*/