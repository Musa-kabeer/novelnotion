const router = require('express').Router({ mergeParams: true });
const { protect, restrictTo } = require('../controller/authController');
const {
 getAllPost,
 getPost,
 createPost,
 getRelatedPost,
 uploadPostPhoto,
 deletePost,
} = require('../controller/postController');

router.route('/:id/related-post/:category').get(getRelatedPost);

router
 .route('/')
 .get(protect, getAllPost)
 .post(restrictTo('user', 'guide', 'admin'), uploadPostPhoto, createPost);

router
 .route('/:id')
 .get(getPost)
 .delete(restrictTo('user', 'guide', 'admin'), deletePost);

module.exports = router;
