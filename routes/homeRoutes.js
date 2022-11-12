const router = require("express").Router();
const { Event, User, Invite } = require("../models");


//show all events - for homepage
router.get("/", async (req, res) => {
  // Shows all events
  try {
    const eventData = await Event.findAll({
      include: [User],
    });
    console.log(eventData);

    // serialize
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sessions", (req, res) => {
  res.json(req.session);
});

//Show one event - for expanding event details
router.get("/event/:id", async (req, res) => {
  // Shows one event
  try {
    const eventData = await Event.findOne({
      where: {
        id: req.params.id,
      },
      include: [User],
    });

    if (eventData) {
      // serialize
      const event = eventData.get({ plain: true });

      res.render("single-event", {
        event,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // login
  if (req.session.loggedIn) {
    return res.redirect(`/users/${req.session.id}`);
  }
  res.render("login", {
    loggedIn: false,
    userId: null,
  });
});

router.get("/signup", (req, res) => {
  // signup
  if (req.session.loggedIn) {
    return res.redirect(`/users/${req.session.id}`);
  }
  res.render("signup", {
    loggedIn: false,
    userId: null,
  });
});

router.get('/logout', (req, res) => {
    // logout
    if(!req.session.loggedIn){
        res.redirect("/login")
    } else if (req.session.loggedIn) {
      req.session.destroy();
      res.redirect("/")
    } else {
      res.status(404).end();
    }
});

//profile
router.get("/users/:id", (req, res) => {

    if (!req.session.loggedIn) {
      return res.redirect(`/login`);
    }
    User.findByPk(req.params.id, {
        include:[Event]
      })
      .then((foundUser) => {
        const hbsUser = foundUser.get({ plain: true });
        console.log(hbsUser);
        hbsUser.loggedIn = true;
        hbsUser.userId = req.session.userId;
        if (hbsUser.id === req.session.userId) {
          hbsUser.isMyProfile = true;
          res.render("profile", hbsUser);
        }
      })
  });
  
// add event
router.get("/new-event",(req,res)=>{
    if(!req.session.loggedIn){
        return res.redirect(`/`)
    }
    User.findByPk(req.session.userId).then(foundUser=>{
        if(!foundUser){
            return res.redirect("/404")
        }
        const hbsUser = foundUser.toJSON();
        console.log(hbsUser)
            res.render("addEvent",hbsUser)
    })
})
router.get("/calendar", (req,res)=>{
  if(!req.session.loggedIn){
    return res.redirect(`/login`);
  }
  res.render("calendar")
})

module.exports = router;
