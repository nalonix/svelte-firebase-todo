<script>
    import {authHandlers, authStore} from "../../store/store.js";
    import {doc, getDoc, setDoc} from 'firebase/firestore'
    import {auth, db} from '../../lib/firebase/firebase.js'

    let todoList = [];
    let currTodo = '';
    let error = false;

    authStore.subscribe(value =>{
        todoList = value.data.todos;
    })

    function addTodo(){
        if (!currTodo)
            error = true;
        else{
            todoList.push(currTodo);
            todoList = todoList;
            currTodo = '';
        }

    }

    function editTodo(index){
        let newTodoList = todoList.filter((val,i)=>{
            return i !== index;
        });
        currTodo = todoList[index];
        todoList = newTodoList;
    }

    function removeTodo(index){
        let newTodoList = todoList.filter((val,i)=>{
            return i !== index;
        });
        todoList = newTodoList;
    }

    async function saveTodos(){
        try{
            const userRef = doc(db, 'user', $authStore.user.uid);
            await setDoc(userRef, {
                todos: todoList
            },{
                merge: true
            })
        }catch (e) {
            console.log(e);
        }
    }

</script>

{#if !$authStore.loading}


<div class="mainContainer">
<div class="headerContainer">
    <h1>Todo List</h1>
    <div class="headerButtons">
        <button on:click={saveTodos}>
            <i class="fa-solid fa-floppy-disk"></i>
            <span>
            Save
        </span>
        </button>

        <button on:click={authHandlers.logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span>
            Log Out
        </span>
        </button>
    </div>
</div>
    <main>
        {#if todoList.length === 0}
<p>Nothing todo... relax!</p>
            {/if}
        {#each todoList as todo, index}
            <div class="todo">
                <p>{index+1}. {todo}</p>
                <div class="actions">
                    <i class="fa-solid fa-pen" on:click={()=>{
                        editTodo(index);
                    }}
                    on:keydown={()=>{}}></i>
                    <i class="fa-solid fa-trash" on:click={()=>{
                        removeTodo(index);
                    }}
                       on:keydown={()=>{}}></i>
                </div>
            </div>
        {/each}
    </main>
    <div class={"enterTodo " + (error && "errorBorder")}>
        <input type="text" bind:value={currTodo} name="todo" placeholder="Enter Todo" id="todo">
        <button on:click={addTodo}>ADD</button>
    </div>

</div>
{/if}
<style>
    .mainContainer{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        margin: 0 auto;
    }

    .headerContainer{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .headerContainer button{
        background: #003c5b;
        color: white;
        padding: 10px 18px;
        border: none;
        border-radius: 4px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
    .headerContainer button i{
        font-size: 1.1rem;
    }
    .headerContainer button:hover{
        opacity: 0.7;
    }
    .headerButtons{
        display: flex;
        align-items: center;
        gap: 14px;
    }
    main{
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }
    .todo{
       border-left: 1px solid cyan;
        padding: 8px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .actions{
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 1.3rem;
    }
    .actions i:hover{
        color: coral;
    }
    .actions i{
        cursor: pointer;
    }
    .enterTodo{
        display: flex;
        align-items: stretch;
        border: solid 1px #0891b2;
        border-radius: 5px;
        overflow: hidden;
    }
    .errorBorder{
        border-color: coral!important;
    }
    .enterTodo input{
        background: transparent;
        outline: none;
        border: none;
        padding: 14px;
        color: white;
        flex: 1;
    }
    .enterTodo input:focus{
        outline: none;
    }
    .enterTodo button{
        padding: 0 28px;
        background: #003c5b;
        border: none;
        color: cyan;
        font-weight: 600;
        cursor: pointer;
    }
    .enterTodo button:hover{
        background: transparent;
    }
</style>