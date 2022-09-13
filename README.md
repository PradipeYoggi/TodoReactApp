# TodoReactApp

TODO App is a simple React App that use Functional React Components to implement a simple Todo app.

The user can input the task title, description, when it needs to be started and the due date to finish it.

The supported features are the ability to Add, Update and Delete items from the todo list. The todo list is shown in a table on the right side. Any row in the table can be clicked to load that row into the Todo form where it can be edited and updated or deleted or the data use as a base for additing a new todo.

The app hits the CrudCrud API service. Due to CORS restrictions on the CrudCrud server, the user/tester may have to use a proxy server such as https://cors-anywhere.herokuapp.com/corsdemo This url should be visited from the machine where the app will be tested/run to get a temporary authorization for that system to use this proxy server.

The code in TodoService.js has the url to the crudcrud service appended to the the above proxy server url and thus the code won't work when run unless the above steps are followed.

Basic structure in code of the app:

* App functional React component
  * TodoList functional React component (handles all the data fetching using the TodoService)
    * TodoCrudForm functional React component (handles the C/U/D operations of the todo data loaded or input into the form)
    * TodoTable functional React component (shows all the Todos and allows selecting a todo by clicking on a row)
      
TodoService which does all the interactions with the CrudCrud Todo APIs. This service has very simple error handling. Certainly better error handling can be added as one would in a professional setting, vs. an academic setting.

