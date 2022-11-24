import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/models';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  function uniqueIds(): number {
    return Math.floor(Math.random() * Date.now());
  }

  const addTodos = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: uniqueIds(), request: todo, isCompleted: false }]);
      setTodo('');
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log('result', result);
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    let temp,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === 'TodosList') {
      temp = active[source.index];
      active.splice(source.index, 1);
    } else {
      temp = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, { ...temp, isCompleted: false });
    } else {
      complete.splice(destination.index, 0, { ...temp, isCompleted: true });
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} addTodos={addTodos} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
