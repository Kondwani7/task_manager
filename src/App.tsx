import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import Todo from './components/model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompeletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      //create a task and add(spread) to the array of todos
      setTodos([...todos, {id: Date.now(), todo, isDone:false}]);
      //after the task has been created we can empty the input field
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompeletedTodos(complete);
    setTodos(active);
  };

  console.log(todos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
      <span className='heading'>Task Manger</span>
      <InputField todo={todo} setTodo = {setTodo} handleAdd = {handleAdd}></InputField>
      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        completedTodos={completedTodos} 
        setCompletedTodos={setCompeletedTodos} />
    
    </div>
    </DragDropContext>
    
  )
}

export default App;
