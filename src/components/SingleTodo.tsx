import React, { useRef, useState } from 'react';
import {Todo} from './model';
import {AiFillEdit, AiFillDelete } from 'react-icons/ai';
import {MdOutlineDownloadDone} from 'react-icons/md';
import { useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number,
  todo: Todo,
  todos: Todo[],
  setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({index, todo, todos, setTodos}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id) ===id ? {...todo, todo: editTodo}: todo)
    );
    setEdit(false);
  }
  //inital ref value for the input
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  const handleDelete = (id: number) => {
    //handle deleteing a task
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => 
        todo.id === id? {
          ...todo,
          isDone: !todo.isDone
          //assigning this a completed task
        }: todo)
    )
  }

  return (
    <Draggable draggableId= {todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
          onSubmit={(e) => handleEdit(e, todo.id) }
          ref = {provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
      >
        {edit ? (
          <input 
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)} 
            className='todos__single--text'
            ref={inputRef}/>
        ) : todo.isDone ? (
          <s className='todos__single--text'>{todo.todo}</s>
        ) :(
          <span className='todos__single--text'>{todo.todo}</span>
        )}      
        <div>
          <span className='icon' onClick={() => {
            //editing a task
            if(!edit && !todo.isDone){
              setEdit(!edit);
            }
          }}>
            <AiFillEdit/>
          </span>
          <span className='icon' onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className='icon'>
            <MdOutlineDownloadDone onClick={() => handleDone(todo.id)}/>
          </span>
        </div>
    </form>
      )}
      
    </Draggable>  
    );
};

export default SingleTodo;
