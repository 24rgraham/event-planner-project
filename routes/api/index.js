const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const inviteRoutes = require('./inviteRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/invites', inviteRoutes);

module.exports = router;