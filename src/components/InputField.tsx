import React,{useRef} from 'react';
import './styles.css';
//how to assign props in typescript
interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({todo, setTodo, handleAdd} : Props) => {
    const initialRef = useRef<HTMLInputElement>(null);
  return(
    <form className="input" onSubmit={
            (e) => {
                handleAdd(e);
                initialRef.current?.blur();
        }}>
        <input ref={initialRef} type='input' placeholder='Enter task' className='input__box'
        value={todo} onChange={(e)=> setTodo(e.target.value)}/>
        <button type='submit' className='input_submit'>Go</button>
    </form>
  ) 
  
};

export default InputField;
