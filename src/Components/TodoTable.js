import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

// manages the list of Todos in a table
// selections are made by clicking on a row
export default function TodoTable(props) {
    const [selectedRowId, setSelectedRowId] = useState(null);
    let todos = [];

    // on click, raise the event to the parent component
    const onClick = event => {
        setSelectedRowId(event.target.parentElement.id);

        if (props.onSelected) {
            let todo = props.todoListInput.find(todo => (todo._id === event.target.parentElement.id));
            todo.when = todo.when.substring(0,10);
            todo.dueBy = todo.dueBy.substring(0,10);
            props.onSelected(todo);
        }
    }
    
    // prepare the jsx for the rows and render it in the table
    let rows = null;
    if (props.todoListInput) {
        rows = props.todoListInput.map((row, index) => {
            return (<tr key={`${row._id}`} id={`${row._id}`} onClick={onClick} >
                <td>{`${index+1}`}</td>
                <td>{row.title}</td>
                <td>{row.notes}</td>
                <td>{row.when.substring(0,10)}</td>
                <td>{row.dueBy.substring(0,10)}</td>
            </tr>);
        });    
    }
    
    // render the table
    return (
        <div id="todo-table" className='card-body'>
            <Table striped bordered hover responsive='sm'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Task Details</th>
                        <th>Start Date</th>         
                        <th>Due Date</th>
                    </tr>
                </thead>
                    <tbody>
                        {rows}
                    </tbody>
            </Table>
        </div>
    );
}
