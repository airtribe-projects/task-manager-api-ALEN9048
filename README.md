# Task Manager API
 
A RESTful API for managing tasks built with Node.js and Express.js using in-memory storage.
 
## Setup Instructions
 
1. Clone the repository
   git clone <your-repo-url>
   cd task-manager-api
 
2. Install dependencies
   npm install
 
3. Start the server
   node app.js
 
Server runs at http://localhost:3000
 
## API Endpoints
 
### GET /tasks
Retrieve all tasks.
 
### GET /tasks/:id
Retrieve a specific task by ID.
Returns 404 if task not found.
 
### POST /tasks
Create a new task.
Required fields: title (string), description (string), completed (boolean)
Returns 400 if any field is missing or invalid.
 
### PUT /tasks/:id
Update an existing task by ID.
Required fields: title (string), description (string), completed (boolean)
Returns 404 if task not found, 400 if data is invalid.
 
### DELETE /tasks/:id
Delete a task by ID.
Returns 404 if task not found.
 
## Testing
Run npm run test to execute all test cases.
 