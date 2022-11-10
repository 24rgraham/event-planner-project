const router = require('express').Router();
const { Event, User, Invite } = require('../models');

router.get('/', async (req, res) => {
    // Shows all events
    try {
        const eventData = await Event.findAll({
            include: [User]
        })
        console.log(eventData)

        // serialize
        const events = eventData.map((event) => event.get({ plain: true }))
        res.render('homepage', {
            events,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/event/id:', async (req, res) => {
    // Shows one event
    try {
        const eventData = await Event.findOne({
            where: {
                id: req.params.id
            },
            include: [User]
        })

        if (eventData) {
            // serialize
            const event = eventData.get({ plain: true })

            res.render('single-event', {
                event,
                loggedIn: req.session.loggedIn
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // login
    if (req.session.loggedIn) {
      return res.redirect('/dashboard');
    }
    res.render('login', {
        loggedIn: false,
        userId: null
    });
});

router.get('/signup', (req, res) => {
    // signup
    if (req.session.loggedIn) {
      return res.redirect('/signup');
    }
    res.render('signup', {
        loggedIn: false,
        userId: null
    });
});

// shows user events
router.get('/users/:id', async (req,res) => {
    // if not logged in, redirect to login
    if (!req.session.loggedIn) {
        return res.redirect('/login')
    }
    // get all posts by user id
    try {
        const eventData = await Event.findAll({
            where: {
                userId: req.session.userId
            },
            include: [User]
        })
        // serialize
        const events = eventData.map((post) => post.get({ plain: true }))

        res.render('', {
            events,
            loggedIn: true
        })
    } catch (err) {
        res.redirect('login')
    }
});

module.exports = router;