const router = require('express').Router();
const {
 signup,
 login,
 restrictTo,
 protect,
} = require('../controller/authController');
const {
 updateUser,
 updatePassword,
 getAllUser,
 deleteUser,
 updateUserPhoto,
} = require('../controller/userController');
const postRoutes = require('./postRoutes');

// MERGE ROUTE
router.use('/:id/posts', postRoutes);

// ATHENTICATION ROUTES
router.route('/signup').post(signup);
router.route('/login').post(login);
// router.route('/logout').post(logout);

// PROTECT ALL THE ROUTES AFTER THIS MIDDLEWARE
router.use(protect);

// USER INFO UPDATE
router.route('/updatePassword').patch(updatePassword);

router.route('/').get(restrictTo('admin'), getAllUser);

router
 .route('/:id')
 .patch(updateUserPhoto, updateUser)
 .delete(restrictTo('admin'), deleteUser);

module.exports = router;
