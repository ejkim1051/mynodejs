const express = require('express');
const postController = require('../controllers/postController');
const {authenticate} = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/', postController.findAll);
router.post('/', authenticate, postController.createPost);
router.get('/:id', postController.findPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);


module.exports = router;