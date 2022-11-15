const router = require('express').Router();
const { User, Event, Invite } = require('../../models');

router.get('/rsvp', (req, res) => {
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
      res.json(events)
    })
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
      res.json(events)
    })
  }
})

//get all
router.get('/', (req, res) => {
  Event.findAll({
    // include:[User]
  }).then(eventData => {
    res.json(eventData)
  }).catch(err => {
    res.status(500).json({ msg: "An error has occurred", err })
  })
})

  //get all public
  router.get('/public',(req,res)=>{
    Event.findAll({

    }).then(eventData=>{
        res.json(eventData)
    }).catch(err=>{
        res.status(500).json({msg:"An error has occurred",err})
    })
  })

//get one event
router.get('/:id', (req, res) => {
  Event.findByPk(req.params.id)
    .then((event) => {
      res.json(event)
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ err: err })
    })
})

//create event
router.post('/', async (req,res) => {
    try {
        const newEvent = await Event.create({
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            location: req.body.place,
            event_photo: req.body.event_photo,
            description: req.body.description,
            isPrivate: req.body.isPrivate,
            event_creator: req.body.event_creator
        });
        res.status(200).json(newEvent)
    } catch (err) {
        res.status(400).json(err);
    } 
})

//update event
router.put('/:id', (req,res)=>{
    Event.update({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        event_photo: req.body.event_photo,
        description: req.body.description,
        isPrivate: req.body.isPrivate,
        event_creator: req.body.event_creator
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((updatedEvent) => {
      if (updatedEvent[0] === 0) {
        return res.status(404).json({ msg: "no event found" });
      }
      res.json(updatedEvent)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
})

//delete
router.delete('/:id', async (req, res) => {
    try {
      const event = await Event.destroy({
        where: {
          id: req.params.id
        }
      })

      if(!event) {
        return res.status(400).json({message: "No event"})
      }
      res.status(200).json(event)
    } catch (err) {
      console.log(err)
    }
});

module.exports = router;