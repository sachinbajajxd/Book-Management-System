const express=require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userControllers=require('../controllers/userControllers');
const jwt=require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    
    const authHeader = req.headers.authorization;
    console.log(req.cookies);
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Token not provided' });
    }
  
    const token = authHeader.split(' ')[1];

    // console.log(token);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token invalid' });
      }
    //   console.log(decoded);
      req.id = decoded.user._id;
      console.log(req.id,'Req');
      next();
    });
}

router.get('/', (req, res) => {
    console.log("Hello we are on home page");
    res.json(202);
});

//Signup 
router.post('/api/register', userControllers.Signup);

//Login
router.post('/api/login', userControllers.Login);

//Logout
router.post('/api/logout', verifyToken, userControllers.Logout);

//Fetch a single book
router.get('/api/books/:id', verifyToken, userControllers.book);

//Crate a book
router.post('/api/books', verifyToken, userControllers.addBook);

//Fetch all books
router.get('/api/books', verifyToken, userControllers.books);

//Update a book
router.patch('/api/books/:id', verifyToken, userControllers.updateBook);

//Delete a book
router.delete('/api/books/:id', verifyToken, userControllers.deleteBook);


module.exports = router;