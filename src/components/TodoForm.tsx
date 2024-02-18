import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { addTodo } = useTodo();
    const [status,setStatus] = useState("Not Started");

    const add = () => {
        if(!title) return;
        addTodo({title, description, status});
    }

    return (
        <form className="flex flex-col" onSubmit={add}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write todo... " className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"/>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write To Do description... " className="w-full border border-black/10 mt-5 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5" />
            <div className="flex justify-between py-0 m-0 items-center">
                <select
                value={status}
                className="border border-black/10 my-5 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Not started">Yet to start</option>
                    <option value="On Going">On going</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit" className="w-40 h-1/2 rounded-lg px-6 py-1.5 bg-green-600 text-white shrink-0">
                    Add 
                </button>
            </div>
        </form>
    )
}

export default TodoForm