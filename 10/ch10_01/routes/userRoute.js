const express = require('express');
const userController = require('../controllers/userController');
const {check} = require('express-validator');

const router = express.Router();

router.get('/', userController.findAll);
router.post('/', [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').notEmpty().withMessage("Emain is required").isEmail().withMessage("invalid email fotmat")
], userController.createUser);

module.exports = router;