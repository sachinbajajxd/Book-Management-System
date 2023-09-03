const User = require('../models/User');
const Book = require('../models/Book');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

module.exports.Signup = async (req, res) => {

    const body = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const username=body.username;
    const email=body.email;
    const password=body.password;

    console.log(body);

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
        if (existingUser) {
          return res.status(400).json({ message: 'Username or email is already taken' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
    
        await newUser.save();
    
        return res.json({
            message: "Signup successful",
            newUser
        });
    }catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
}

module.exports.Login = async (req, res) => {

    const body = {
        email: req.body.email,
        password: req.body.password
    }

    const email=body.email;
    const password=body.password;

    console.log(body);

    try{
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '2h'}, (err, token) => {
            if(err){
                res.json({
                    message: "There is some error"
                })
            }else{
                console.log("User logged in");
                res.json({
                    user,
                    token
                });
            }
        })

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.Logout = async (req, res) => {
    
    //*** In frontend remove jwt token from localstorage

    res.status(200).json({ message: 'Logout successful' });
}

module.exports.books = async (req, res) => {


    try {
        const books = await Book.find();
        // console.log(books);
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
      }
}

module.exports.book = async (req, res) => {
    console.log(req.params, "params");
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        res.json(book);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

module.exports.addBook = async (req, res) => {
    try {

        // Check if a book with the same title and publication year already exists
        const existingBook = await Book.findOne({
            title: req.body.title,
            publicationYear: req.body.publicationYear,
        });
    
        if (existingBook) {
            return res.status(409).json({ message: 'Book already exists in the database' });
        }

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear
        }); // Create a new Book instance from the request body

        await newBook.save(); // Save the new book to the database

        res.status(201).json(newBook); // Return the newly created book as JSON
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}
module.exports.updateBook =async (req, res) => {

    try {
        const bookId = req.params.id;
        const {title, author, genre, publicationYear} = req.body;

        const updatedBookData = {title, author, genre, publicationYear, _id:bookId}
    
        // Find the book by its ID and update its details
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, { new: true });
    
        if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        res.json(updatedBook);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports.deleteBook = async(req, res) => {
    // const userId = req.id;
    try{
        const { id } = req.params;
        console.log(id, 'req.params');
        const deletedItem = await Book.findByIdAndDelete({_id: id});
        console.log(deletedItem);
    
        res.status(200).json({message: "Item deleted successfully"});
    
    }catch(error){
        res.status(500).json({ error: error.message});
    }
}