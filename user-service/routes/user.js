const express= require('express');
const { register, login, getAllUsers, updateProfile } = require('../controllers/user.controller');
const router= express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllUsers);
router.put('/update/:userId', updateProfile);


module.exports= router;