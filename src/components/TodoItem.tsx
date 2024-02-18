import { useEffect, useState } from "react";
import { Todo, useTodo } from "../context/TodoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


const TodoItem = ({todo} : {todo: Todo}) => {
    const [status, setStatus] = useState(todo.status)
    const [todoMsg, setTodoMsg] = useState(todo.title);
    //const [desc, setDescription] = useState(todo.description);
    const { updateTodo, deleteTodo, toggleStatus } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [backgroundColour, setBackgroundColour] = useState("bg-[#de6e54]")

    const editTodo = () => {
        updateTodo(todo.id, {...todo, title: todoMsg})
        setIsTodoEditable(false)
    }
    const toggleCompleted = () => {
        if(status === "Completed"){
            setStatus("Not Started");
            setBackgroundColour("bg-[#de6e54]");
        }else if(status === "On Going"){
            setStatus("Completed");
            setBackgroundColour("bg-[#8bde54]");
        }else{
            setStatus("On Going");
            setBackgroundColour("bg-[#d3ba27]");
        }
    }

    useEffect(()=>{
        if(status === "Completed"){
            setBackgroundColour("bg-[#8bde54]");
        }else if(status === "On Going"){
            setBackgroundColour("bg-[#d3ba27]");
        }else{
            setBackgroundColour("bg-[#de6e54]");
        }
    })

    useEffect(()=>{
        toggleStatus(todo.id, status);
    },[status])

    return (
        <div onClick={() => toggleCompleted()} className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 w-full text-black ${backgroundColour} cursor-pointer`}>
            
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent cursor-pointer"
                } ${todo.status === "Completed" ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.status==="Completed") return;
  
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.status==="Completed"}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;