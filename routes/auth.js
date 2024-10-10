const express = require('express');
const router = express.Router();
const { regis , login} = require('../controllers/auth'); 


//http://localhost:4900/api/register
router.post('/register', regis);

router.post('/login', login);



module.exports = router;