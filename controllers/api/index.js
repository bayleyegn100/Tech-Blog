const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');
const blogCommentRoutes = require('./blogCommentRoutes');

//  To mount middleware for the routes, router.use used.
router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);
router.use('/blogComments', blogCommentRoutes);

module.exports = router;
