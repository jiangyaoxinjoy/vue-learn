let vm = new Vue({
    el: '#app',
    data: {
        todos: [
            {
                isSelected:false,
                title: 'sleep'
            },
            {
                isSelected:true,
                title: 'eat'
            }
        ],
        inputVal:'',
        curTodo: '',
        hash:''
    },
    computed: {
        willTodo() {
            let reducer = (count,cur) => {
                if(!cur.isSelected){
                    return count + 1;
                }else{
                    return count;
                }
            }
            return this.todos.reduce(reducer,0)
        },
        calculateTodos() {
            switch (this.hash) {
                case 'all':
                    return this.todos;
                    break;
                case 'finish':
                    return this.todos.filter( item => item.isSelected);
                    break;
                case 'unfinish' :
                    return this.todos.filter( item => !item.isSelected);
                    break;
                default:
                    return this.todos;
                    break;
            }
        }
    },
    methods: {
        add() {
            let todo = {
                isSelected: false,
                title: this.inputVal
            }
            this.todos.unshift(todo);
            this.inputVal = '';
        },
        del(item) {
            let newTodos = this.todos.filter( val => val !== item);
            this.todos = newTodos;
        },
        rember(item) {
            this.curTodo = item;
        },
        editTodo(item) {
            this.curTodo = '';
        }
    },
    directives: {
        focusAa(el,bindings) { //如果html里的命名比较长加了‘-’，js里用驼峰命名。
            if(bindings.value) { //当时input还没显示，focus()不生效，所以加一个定时器
                setTimeout( () => {
                    el.focus();
                })
            }
        }
    },
    watch: { //watch默认只监控一层的数据变化。deep: true.深度监控
        todos: {
            handler() {
                //localStorage默认存的是字符串。JSON.stringify转成字符串。
                localStorage.setItem('data',JSON.stringify(this.todos));
            },deep: true
        }
    },
    created() { //初始化数据
        //如果localStorage没有数据，就用默认数据
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;
        this.hash = window.location.hash.slice(2) || 'all';
        //监控hash值的变化
        window.addEventListener('hashchange', () => {
            this.hash = window.location.hash.slice(2);
        },false);
    }
});
//1. 将数据循环到页面上
//2.敲回车的时候添加新的数据
//3.删除功能
//4.计算一下当前没有被选中的个数