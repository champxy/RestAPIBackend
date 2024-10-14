const express = require('express');
const router = express.Router();
const { read , list , create , update, remove} = require('../controllers/product');
//midleware
const { auth } = require('../middleware/auth'); 
const { upload } = require('../middleware/upload');

//http://localhost:4900/api/product
router.get('/product',auth, list);

router.get('/product/:id',auth, read);

router.post('/product',auth, upload ,  create);

router.put('/product/:id',auth, update);

router.delete('/product/:id',auth, remove);

module.exports = router;