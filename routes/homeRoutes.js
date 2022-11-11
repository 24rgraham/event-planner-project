const router = require("express").Router();
const { Event, User, Invite } = require("../models");

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
  User.findByPk(req.params.id)
    .then((foundUser) => {
      const hbsUser = foundUser.get({ plain: true });
      console.log(hbsUser);
      hbsUser.loggedIn = true;
      hbsUser.userId = req.session.userId;
      if (hbsUser.id === req.session.userId) {
        hbsUser.isMyProfile = true;
      }
    })
    .then(res.render("profile"));
});

// shows user events
// router.get("/users/:id", async (req, res) => {
//   // if not logged in, redirect to login
//   if (!req.session.loggedIn) {
//     return res.redirect("/login");
//   }
//   // get all posts by user id
//   try {
//     const eventData = await Event.findAll({
//       where: {
//         userId: req.session.userId,
//       },
//       include: [User],
//     });
//     // serialize
//     const events = eventData.map((post) => post.get({ plain: true }));

//     res.render("profile", {
//       events,
//       loggedIn: true,
//     });
//   } catch (err) {
//     res.redirect("login");
//   }
// });

module.exports = router;
