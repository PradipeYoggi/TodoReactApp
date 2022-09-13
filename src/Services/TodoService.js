// The service object that manages CRUD operations for the Todo object
export default class TodoService {

    //proxy server used when crudcrud was failing due to CORS (even with live-server)
    static url = 'https://cors-anywhere.herokuapp.com/https://crudcrud.com/api/53a11b87e5b24e1fa532bab6a4868133/Todos';
    //static url = 'https://crudcrud.com/api/53a11b87e5b24e1fa532bab6a4868133/Todos';

    // fetches all the Todos from the server
    static async getAllTodos() {
        const res = await fetch(this.url);
        return await res.json();
    }

    // creates a new Todo on the server
    static async createTodo(todo) {
        try {
            delete todo._id; //removing _id from the body to avoid errors
            const res = await fetch(this.url,
                {
                    crossDomain: true,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todo)
                });
            return await res.json();
        } catch (e) {
            console.log(`createTodo failed with error: ${e}`);
        }
        return null;
    }

    // updates the given todo object on the server
    static async updateTodo(todo) {
        try {
            let id = todo._id;
            delete todo._id; //removing _id from the body as CrudCrud doesn't like it
    
            const res = await fetch(`${this.url}/${id}`,
            {
                crossDomain: true,
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });
            return await res.json();    
        } catch(e) {
            console.log(`updateTodo failed with error: ${e}`);            
        }
        return null;
    }

    // deletes the Todo identified by the id from the server
    static async deleteTodo(id) {
        try {
            const res = await fetch(`${this.url}/${id}`,
            {
                crossDomain: true,
                method: 'DELETE'
            });
            return await res.json();    
        } catch(e) {
            console.log(`deleteTodo failed with error: ${e}`);
        }
        return null;
    }
}
