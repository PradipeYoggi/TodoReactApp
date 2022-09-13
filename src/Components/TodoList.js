import React from 'react'
import TodoCrudForm from './TodoCrudForm';
import TodoTable from './TodoTable';
import { useState, useEffect } from 'react';
import TodoService from '../Services/TodoService';
import styles from './TodoList.css';

const initialState = {
    _id: '',
    title: '',
    notes: '',
    when: '',
    dueBy: ''
}

// the parent component for the todo functional components
// manages the retrieval of todos from the API and 
// holds it for use in child components
export default function TodoList(props) {
    const [todo, setTodo] = useState(initialState);
    const [todoList, setTodoList] = useState([]);

    // load todos from API
    const refreshTodoList = () => {
        let todos = [];

        TodoService.getAllTodos()
            .then((response) => {
                console.log('getAllTodos');
                console.log(response);
                todos = response
            })
            .then(() => {
                console.log('todos');
                console.log(todos);
                setTodoList([...todos]);
            })
            .catch(error => console.log(error));
            console.log('refreshTodoList');
            console.log(todos);
    }

    // initial loading of any todos that exist in the backend
    useEffect( ()=> {
        refreshTodoList();
    }, []);

    // on todo selection (raised from child component) set state 
    // to trigger rendering of this and child components
    const onTodoSelected = (selectedTodo) => {
      setTodo(selectedTodo);
    }
  
    // refresh current todo data being edit in the child (TodoCurdForm)
    const onTodoEdited = (data) => {
      setTodo(data);
    }
  
    // reset state for refresh of the TodoCrudForm and
    // refresh list to reflect add/update/delete done in the form
    // so it reflects in the TodoTable
    const onUpdatesToTodoList = () =>  {
      setTodo(initialState);
      refreshTodoList();
    }
  
    // render the Crud form and the Todo table using data in this component
    return (
        <div className="container">
          <div className="row">
            <div className="col">
              <TodoCrudForm data={todo} onFormChange={onTodoEdited} onUpdates={onUpdatesToTodoList}/>
            </div>
            <div id={styles['todo-table']} className="col">
              <TodoTable todoListInput={todoList} onSelected={onTodoSelected} />
            </div>
          </div>
        </div>
    );
}
