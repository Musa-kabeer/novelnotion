const router = require('express').Router();

const {
 createComment,
 getComment,
 getAllComment,
} = require('../controller/commentController');
const { protect } = require('../controller/authController');

router.route('/').get(getAllComment).post(protect, createComment);
router.route('/:id').get(getComment);

module.exports = router;
