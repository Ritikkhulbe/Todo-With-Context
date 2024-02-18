import { useEffect, useState } from "react";
import { TodoContextProvider, Todo } from "./context/TodoContext";
import { TodoForm, TodoItem } from "./components";


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (todo : Todo) => {
    setTodos(prev => [...prev, {id: Date.now(), ...todo}])
  }

  const updateTodo = (id: number, todo: Todo) => {
    setTodos(prev => prev.map((prevTodo) => (prevTodo.id === id ? todo: prevTodo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const toggleStatus = (id: number, setStatus: string) => {
    setTodos(prev => prev.map(prevTodo => ((prevTodo.id === id) && (prevTodo.status !== setStatus)) ? {...prevTodo,status: setStatus} : prevTodo));
  }
  
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos")!);

    if(todos && todos.length > 0){
      setTodos(todos);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  return (
    <TodoContextProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleStatus}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2"> Manage your todo</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {
              todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App;