//Circle Style
let mainRedColor = "#FF4384";
let whiteColor = "#FFFFFF";
let lightblueColor = "#00A7FF";

let middleCircle = document.getElementsByClassName('defaultCircle');
let middleCircleThumb = document.getElementsByClassName('defaultCircleB');
let progressBar = document.getElementsByClassName('progressValue');
let progressBarThumb = document.getElementsByClassName('progressValueB');
let leftCircle = document.getElementsByClassName('leftbackCircle');
let rightCircle = document.getElementsByClassName('rightbackCircle');
let displayedCounter = document.getElementsByClassName('counter');

middleCircle[0].style.fill = mainRedColor;
middleCircle[0].style.stroke = mainRedColor;

middleCircleThumb[0].style.fill = mainRedColor;
middleCircleThumb[0].style.stroke = mainRedColor;

progressBar[0].style.fill = "none";
progressBar[0].style.stroke = mainRedColor;
progressBar[0].style.opacity = "0";

progressBarThumb[0].style.fill = "none";
progressBarThumb[0].style.stroke = mainRedColor;
progressBarThumb[0].style.opacity = "0";

//Counter 
let interval = 1000;
let second = 2;
let minute = Math.floor((second) / 60);
let strokeOffset = 0;
let strokeCountInSecond = Math.floor(2 * 3.14 * 54) / second;

// Vue App

let app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todos: [],
        currentTodo: 0,
        currentTomato: 0,
        tomatos: [],
        tomatoStatus: true,
        cacheTodo: {},
        cacheTitle: '',
        visibility: "active",
        noData: true,
        moreData: false,
        moreNum: 0,
        sessionTime: 2,
        timerMinutes: "25",
        timerSeconds: "00",
        timerStart: false,
        timeFunc: null
    },
    methods: {
        addTodo: function () {
            let value = this.newTodo.trim();
            let timestamp = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.push({
                id: timestamp,
                title: value,
                completed: false,
                isCurrentTodo: false
            });
            this.newTodo = '';
        },
        deleteTodo: function (todo) {
            let vm = this;
            let newIndex = vm.todos.findIndex(function (item, key) {
                return todo.id === item.id;
            })
            this.todos.splice(newIndex, 1);
        },
        runTodo: function () {
            alert("run");
        },
        // timer() {
        //     this.timeFunc = setInterval(() => {
        //         if (this.sessionTime === 0) {
        //             clearInterval(counterInterval);
        //         } else {
        //             this.sessionTime--;
        //             strokeOffset = strokeOffset + strokeCountInSecond;
        //             progressBar[0].style.strokeDashoffset = strokeOffset;
        //             progressBar[0].style.opacity = "1";
        //             progressBarThumb[0].style.strokeDashoffset = strokeOffset;
        //             progressBarThumb[0].style.opacity = "1";
        //             middleCircle[0].style.fill = whiteColor;
        //             middleCircleThumb[0].style.fill = whiteColor;
        //             leftCircle[0].style.opacity = whiteColor;
        //             rightCircle[0].style.opacity = whiteColor;
        //         }
        //     }, interval);
        // },
        setTime() {
            this.timerStart = true;
            progressBar[0].style.opacity = "1";
            progressBarThumb[0].style.opacity = "1";
            middleCircle[0].style.fill = whiteColor;
            middleCircleThumb[0].style.fill = whiteColor;
            leftCircle[0].style.opacity = whiteColor;
            rightCircle[0].style.opacity = whiteColor;

            this.timeFunc = setInterval(() => {
                if (this.sessionTime === 0) {
                    progressBar[0].style.opacity = "0";
                    progressBarThumb[0].style.opacity = "0";
                    middleCircle[0].style.fill = mainRedColor;
                    middleCircleThumb[0].style.fill = mainRedColor;
                    leftCircle[0].style.opacity = whiteColor;
                    rightCircle[0].style.opacity = whiteColor;
                    // clearInterval(counterInterval);
                } else {
                    this.sessionTime--;
                    strokeOffset = strokeOffset + strokeCountInSecond;
                    progressBar[0].style.strokeDashoffset = strokeOffset;
                    progressBarThumb[0].style.strokeDashoffset = strokeOffset;
                }
            }, interval);
        },
        stopTime() {
            this.timerStart = false;
            clearInterval(this.timeFunc);
            progressBar[0].style.opacity = "0";
            progressBarThumb[0].style.opacity = "0";
            middleCircle[0].style.fill = mainRedColor;
            middleCircleThumb[0].style.fill = mainRedColor;
            leftCircle[0].style.opacity = whiteColor;
            rightCircle[0].style.opacity = whiteColor;
        },
        clearTimer() {
            this.timerStart = false;
            progressBar[0].style.opacity = "0";
            progressBarThumb[0].style.opacity = "0";
            middleCircle[0].style.fill = mainRedColor;
            middleCircleThumb[0].style.fill = mainRedColor;
            leftCircle[0].style.opacity = whiteColor;
            rightCircle[0].style.opacity = whiteColor;
            this.sessionTime = 1500;
            strokeOffset = 0;
            progressBar[0].style.strokeDashoffset = strokeOffset;
            progressBarThumb[0].style.strokeDashoffset = strokeOffset;
            clearInterval(this.timeFunc);
        },
        openFoldedTodo() {
            let allTodoSec = document.querySelector(".allTodoSec");
            allTodoSec.style.left = "0";
        },
        closeFoldedTodo() {
            let allTodoSec = document.querySelector(".allTodoSec");
            allTodoSec.style.left = "100vw";
        },
        toggleAllTodo() {
            let allTodoListBox = document.querySelector(".allTodo_container");
            let toggleBtnIcon = document.querySelector("#toggleBtnIcon");
            if (allTodoListBox.style.display === "none") {
                allTodoListBox.style.display = "block";
                toggleBtnIcon.textContent = "arrow_drop_up";
            } else {
                allTodoListBox.style.display = "none";
                toggleBtnIcon.textContent = "arrow_drop_down";
            }
        },
        toggleDone() {
            let doneListBox = document.querySelector(".doneTodo_container");
            let toggleDoneBtnIcon = document.querySelector("#toggleDoneBtnIcon");
            if (doneListBox.style.display === "none") {
                doneListBox.style.display = "block";
                toggleDoneBtnIcon.textContent = "arrow_drop_up";
            } else {
                doneListBox.style.display = "none";
                toggleDoneBtnIcon.textContent = "arrow_drop_down";
            }
        }
    },
    computed: {
        activeTodos: function () {
            let newTodos = [];
            this.todos.forEach(function (item) {
                if (!item.completed) {
                    newTodos.push(item);
                }
            })
            if (newTodos.length > 0) {
                this.noData = false;
                if (newTodos.length < 4) {
                    this.moreData = false;
                } else {
                    this.moreData = true;
                    this.moreNum = newTodos.length - 3;
                }
            } else {
                this.noData = true;
                this.moreData = false;
            }
            this.checkTomato;
            return newTodos;
        },
        doneTodos: function () {
            let newTodos = [];
            this.todos.forEach(function (item) {
                if (item.completed) {
                    newTodos.push(item);
                }
            })
            return newTodos;
        },
        setCurrentTodo() {
            if (this.todos.length > 0) {
                this.todos[this.currentTodo].isCurrentTodo = true;
                return this.todos[this.currentTodo].title;
            }
        },
        clock() {
            if (this.sessionTime > 0) {
                let min = ('0' + parseInt(this.sessionTime / 60, 10)).slice(-2);
                let sec = ('0' + this.sessionTime % 60).slice(-2);

                return `${min}:${sec}`
            } else {
                this.sessionTime = 2;
                if (this.currentTomato < 5) {
                    this.currentTomato++;
                } else {
                    this.currentTomato = 1;
                }
                let min = "00";
                let sec = "02";
                this.stopTime();
                return `${min}:${sec}`
            }
        },
        checkTomato() {
            this.tomatos = [];
            for (let i = 0; i < this.currentTomato; i++) {
                console.log(this.currentTomato);
                if (this.currentTomato === 5) {
                    this.tomatos.push({
                        break: true
                    });
                } else {
                    this.tomatos.push({
                        break: false
                    });
                }
            }
        }
    }
});