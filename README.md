# Ticketing API System
<hr>

## Description
This is a ticketing API system that allows users to create tickets, assign them to other users, and close them. The API is built using Express.js Framework and the database is MongoDB.

## API Framework
I have used Express.js framework to build the API. The API is built using MVC architecture without view . Because I have experience with this framework and I find it easy to use and understand. and the following reasons:
- It is easy to use and understand.
- It is fast and lightweight.
- It has a large community of developers.
- It has a large number of plugins available.
- It is easy to integrate with other modules such as template engines, database drivers, etc.

## Database Integration
I have used MongoDB as a database for the following reasons:
- Flexible schema design.
- Scalability.
- High performance.
- Json-like documents.

### Database Schema
The database schema is as follows:
- User
    - name
    - email
    - role
  

- Ticket
  - title
  - description
  - status (open, in progress, closed)
  - assignedTo

<img src="">

## API Endpoints

### User Endpoints
- **GET** `/users` - Get all users.
    - 
- **GET** `/users/:id` - Get a user by id.
- **POST** `/users` - Create a new user.
- **PUT** `/users/:id` - Update a user by id.
- **DELETE** `/users/:id` - Delete a user by id.

### Ticket Endpoints
- **GET** `/tickets` - Get all tickets.
- **GET** `/tickets/:id` - Get a ticket by id.
- **POST** `/tickets` - Create a new ticket.
- **PUT** `/tickets/:id` - Update a ticket by id.
- **DELETE** `/tickets/:id` - Delete a ticket by id.

## Getting Started
To get a local copy up and running follow these simple steps.
1. Clone the repository: 
```
git clone https://github.com/Faisalkh90/Ticket-System.git
```
2. Install npm packages:
```
npm install
```
3. Create a .env file and add the following:
```
PORT=3000
MONGO_URI=YOUR_MONGO_URI
```

4. Run the server:
```
npm start
```



