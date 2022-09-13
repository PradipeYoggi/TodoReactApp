import React from 'react'
import { useState } from 'react';
import TodoService from '../Services/TodoService';

// form input validator
function isValidInput(formData) {
    return (
        (formData.title && formData.when && formData.dueBy) &&
        (formData.title !== '' && formData.when !== '' && formData.dueBy !== '') &&
        ((new Date(formData.when)) <= (new Date(formData.dueBy)))
    );
}

// Manages the Create Update Delete form and the needed API calls via TodoService
export default function TodoCrudForm(props) {
    const [clicked, setClicked] = useState('');

    // on form submit do the appropriate CUD action
    // based on what button was clicked
    const onSubmit = async (event) => {

        event.preventDefault();
        const todo = props.data;
        let refreshNeeded = true;

        // perform the c/u/d operation after validations
        switch(clicked) {
            case "add":
                if (isValidInput(todo)) {
                    let data = await TodoService.createTodo(todo);
                    console.log(data);
                } else {
                    refreshNeeded = false;
                    alert('Please fix the data inconsistency');
                }
                break;
            case "update":
                if (!(todo._id)) {
                    refreshNeeded = false;
                    alert(`Can't update. Not an existing todo item`);
                }
                else if (isValidInput(todo)) {
                    let data = await TodoService.updateTodo(todo);
                    console.log(data);
                } else {
                    refreshNeeded = false;
                    alert('Please fix the data inconsistency')
                }
                break;
            case "delete":
                if (todo._id) {
                    let data = await TodoService.deleteTodo(todo._id);
                    console.log(data);
                } else {
                    refreshNeeded = false;
                    alert(`Can't delete. Not an existing todo item`);
                }
                break;
            default:
                refreshNeeded = false;
                console.log('TodoCrudForm.onSubmit unrecognized click');
                break;
        }

        // raise the event to the parent, so it can refresh the todo list
        if (refreshNeeded) {
            props.onUpdates();
        }
    }

    // set the clicked button state
    const onClick = (event) => {
        setClicked(event.target.id);
    }

    // propagate form changes to parent (as we can't modify props data)
    const onChange = (event) => {
        let data = {...props.data, [event.target.name]: event.target.value};
        props.onFormChange(data);
    }

    // render the form 
    return (

        <div className="card-body">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="title">Task Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={onChange}
                                id="title" 
                                name="title"
                                value={props.data.title || ''}
                                placeholder="I want to do..." />
                            <label htmlFor="notes">Task Details</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={onChange}     
                                id="notes"
                                name="notes" 
                                value={props.data.notes || ''}
                                placeholder="My notes on this..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="when">Start Date</label>
                            <input 
                                type="date" 
                                className="form-control"
                                onChange={onChange}
                                name="when"
                                value={props.data.when ||  ''}
                                id="when" />
                            <label htmlFor="dueBy">End Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                onChange={onChange}
                                name="dueBy"
                                value={props.data.dueBy || ''}
                                id="dueBy" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <button id="add" className="btn btn-primary form-control" onClick={onClick}>Add</button>
                    </div>
                    <div className="col-sm-3">
                        <button id="update" className="btn btn-primary form-control" onClick={onClick}>Update</button>
                    </div>
                    <div className="col-sm-3">
                        <button id="delete" className="btn btn-danger form-control" onClick={onClick}>Delete</button>
                    </div>
                </div>
            </form>
        </div>

  );
}
