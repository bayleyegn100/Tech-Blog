const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//  To mount middleware for the routes, router.use used.
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;