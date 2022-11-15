const router = require("express").Router();
const { Event, User, Invite } = require("../models");

//show all events - for homepage
router.get("/", async (req, res) => {
  // Shows all events
  try {
    const eventData = await Event.findAll({
      include: [User],
    });

    // serialize
    const events = eventData.map((event) => event.get({ plain: true }));
    console.log(events);
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sessions", (req, res) => {
  res.json(req.session);
});

router.get("/sess", (req, res) => {
  res.json(req.sessionID);
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
      console.log(event);
      res.render("single-event", {
        event,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        sessId: req.sessionID
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
    return res.redirect(`/`);
  }
  res.render("login", {
    loggedIn: false,
    userId: null,
  });
});

router.get("/signup", (req, res) => {
  // signup
  if (req.session.loggedIn) {
    return res.redirect(`/`);
  }
  res.render("signup", {
    loggedIn: false,
    userId: null,
  });
});

router.get("/logout", (req, res) => {
  // logout
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else if (req.session.loggedIn) {
    req.session.destroy();
    res.redirect("/");
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
    include: [Event],
  }).then((foundUser) => {
    const hbsUser = foundUser.get({ plain: true });
    hbsUser.loggedIn = true;
    hbsUser.userId = req.session.userId;
    if (hbsUser.id === req.session.userId) {
      hbsUser.isMyProfile = true;
      res.render("profile", hbsUser);
    }
  });
});

// add event
router.get("/new-event", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/`);
  }
  User.findByPk(req.session.userId).then((foundUser) => {
    if (!foundUser) {
      return res.redirect("/404");
    }
    const hbsUser = foundUser.toJSON();
    // console.log(hbsUser);
    res.render("addEvent", {
      hbsUser: hbsUser,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  });
});

//edit event
router.get("/edit-event/:id", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/`);
  }
  User.findByPk(req.session.userId, {
    include: [Event],
  }).then((foundUser) => {
    if (!foundUser) {
      return res.redirect("/404");
    }
    const hbsUser = foundUser.toJSON();
    // console.log(hbsUser)
    const userEvents = hbsUser.events;
    // console.log("user events: " + userEvents);
    // console.log(req.params.id)
    let newArr = [];
    for (let i = 0; i < userEvents.length; i++) {
      if (userEvents[i].id == req.params.id) {
        newArr.push(userEvents[i])
      }
    }
    // console.log(JSON.stringify(newArr[0])) 
    // console.log(JSON.stringify(eventIds))

    res.render("editEvent", {
      userEvents: newArr[0],
      hbsUser: hbsUser,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
    });
  });
});


//render calendar
router.get("/calendar", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect(`/login`);
  }
  res.render("calendar", {
    // hbsUser: hbsUser,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
  });
});



//display rsvp events
router.get("/rsvp-events", (req, res) => {
  if (req.session.loggedIn) {
    Invite.findAll({
      where: {
        invitee_id: req.session.userId
      },
      include: [Event],
    }).then((foundInvite) => {
      if (!foundInvite) {
        return res.redirect("/404");
      }
      const inviteEvents = foundInvite.map((invite) => invite.get({ plain: true }));
      console.log(inviteEvents)
      let events = [];
      for (let i = 0; i < inviteEvents.length; i++) {
        events.push(inviteEvents[i].event)
      }
      console.log(events)
      res.render("eventRsvp", {
        events: events,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      })
    });
  } else {
    Invite.findAll({
      where: {
        sess_id: req.sessionID
      },
      include: [Event],
    }).then((foundInvite) => {
      if (!foundInvite) {
        return res.redirect("/404");
      }
      const inviteEvents = foundInvite.map((invite) => invite.get({ plain: true }));
      console.log(inviteEvents)
      let events = [];
      for (let i = 0; i < inviteEvents.length; i++) {
        events.push(inviteEvents[i].event)
      }
      console.log(events)
      res.render("eventRsvp", {
        events: events,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
      })
    })
  }
});


router.get("/404", (req, res) => {
  res.render("404");
});

router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
