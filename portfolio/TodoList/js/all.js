let app = new Vue({
    el: "#app",
    data: {
        newTodo: '',
        todos: [],
        cacheTodo: {},
        cacheTitle: '',
        visibility: "all"
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
                completed: false
            });
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            let vm = this;
            let newIndex = vm.todos.findIndex(function (item, key) {
                return todo.id === item.id;
            })
            this.todos.splice(newIndex, 1);
        },
        removeAllTodo: function () {
            this.todos = [];
        },
        editTodo: function (item) {
            this.cacheTodo = item;
            this.cacheTitle = item.title;
        },
        cancelEdit: function () {
            this.cacheTodo = {};
        },
        doneEdit: function (item) {
            item.title = this.cacheTitle;
            this.cacheTitle = '';
            this.cacheTodo = {};
        }
    },
    computed: {
        filteredTodos: function () {
            if (this.visibility == 'all') {
                return this.todos;
            } else if (this.visibility == 'active') {
                let newTodos = [];
                this.todos.forEach(function (item) {
                    if (!item.completed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            } else if (this.visibility == 'completed') {
                let newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                })
                return newTodos;
            }
            return [];
        },
        countTodos: function () {
            let allTodos = this.todos.length;
            let j = 0;
            for (let i = 0; i < allTodos; i++) {
                if (this.todos[i].completed === false) {
                    console.log(this.todos[i].completed);
                    j++;
                }
            }

            return j;
        }
    }
});