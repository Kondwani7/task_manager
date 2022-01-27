import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './model';
import SingleTodo from './SingleTodo';

interface Props {
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodoList'>
        {(provided, snapshot) => (
          <div 
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
            ref={provided.innerRef} 
            {...provided.droppableProps}>
          <span className='todos__heading'>
            Active Tasks
          </span>
          {todos.map((todo, index) => (
              <SingleTodo
                index={index} 
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setTodos}/>
          ))}
        </div>
        )}
      </Droppable>
      <Droppable droppableId='TodoRemove'>
        {(provided) => (
          <div className='todos remove' ref={provided.innerRef} {...provided.droppableProps}>
          <span className='todos_heading'>
            Completed Tasks
          </span>
          {completedTodos?.map((todo, index) => (
            <SingleTodo 
              index={index} 
              todo={todo} 
              key={todo.id}
              todos={completedTodos}
              setTodos={setCompletedTodos}/>
          ))}
        </div>
        )}
      </Droppable>
      
      
    </div>
   
  );
};

export default TodoList;
