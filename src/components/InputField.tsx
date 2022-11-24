import React, { useRef } from 'react';
import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodos: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, addTodos }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action="/"
      className="input"
      onSubmit={(e) => {
        addTodos(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a Task"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
