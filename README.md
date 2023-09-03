# Book-Management-System

 This RESTful API is designed to manage a collection of books with user authentication.
 It allows users to perform CRUD (Create, Read, Update, Delete) operations on book entries while implementing secure user authentication using JSON Web Tokens (JWT).

 Get Request
 ![Get Request](get%20request.png)

#  Table of Contents

Setup

Authentication and Authentication


# Getting started

To get started with this project, follow these steps:

1. Clone the Repository
2. Install all the dependencies using "npm install"
3. Start the project using "npm start"
4. I have deployed this project on render.com you make API requests from postman on this URL: https://bookmanagementsystembackend.onrender.com

# API Endpoints and Authentication

User authentication is implemented using JSON Web Tokens (JWT). Users can perform the following authentication actions:

1. Register:
   
Endpoint: POST /api/register

Description: Register a new user.

Request Body: { "username": "your-username", "email": "youremail@email.com", "password": "your-password" }

Response: User registration successful



2.Login:

Endpoint: POST /api/login

Description: Log in an existing user.

Request Body: { "email": "youremail@email.com", "password": "your-password" }

Response: JWT token for authentication.

** Attach this JWT token in headers of postman while making requests where authentication is required



3. Logout:(It should be implmented at the front end side else we can use redis at the server side for logging out the user and blacklisting the current jwt token)

Endpoint: POST /api/logout

Description: Log out the currently authenticated user.

Response: User logout successful.



The API offers the following endpoints to manage books and user authentication:



1. Get All Books:(Authentication Required)

Endpoint: GET /api/books

Description: Retrieve a list of all books.

Response: List of books in JSON format.



2. Get Book by ID:(Authentication Required)

Endpoint: GET /api/books/:id

Description: Retrieve details of a specific book by its ID.

Response: Book details in JSON format.



3. Add New Book:(Authentication Required)

Endpoint: POST /api/books

Description: Add a new book to the collection.

Request Body: { "title": "Book Title", "author": "Author", "genre": "Genre", "publicationYear": 2023 }

Response: New book details in JSON format.



4. Update Book by ID:(Authentication Required)

Endpoint: PATCH /api/books/:id

Description: Update details of a specific book by its ID.

Request Body: { "title": "Updated Book Title", "author": "updated author", "genre": "Updated Genre", "publicationYear": 2024 }

Response: Updated book details in JSON format.



5. Delete Book by ID:(Authentication Required)

Endpoint: DELETE /api/books/:id

Description: Delete a book from the collection by its ID.

Response: Book deleted successfully.


