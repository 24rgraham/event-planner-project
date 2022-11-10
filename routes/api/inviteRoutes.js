const router = require('express').Router();
const { Event, User, Invite } = require('../../models');

// The `/api/invite` endpoint

// get all invites
router.get('/', async (req, res) => {
    try {
      const invites = await Invite.findAll();
      res.status(200).json(invites)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

// get all invites matching event id and respnse status
router.get('/:event/:response', async (req, res) => {
  try {
    const invites = await Invite.findAll({ where: { event_id: req.params.event, response: req.params.response } });
    res.status(200).json(invites)
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// create an invite

router.post('/', async (req, res) => {
    try{
      const invite = await Invite.create(req.body);
      res.status(200).json(invite)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

// change response status for invite

router.put('/:id', async (req, res) => {
    try{
      const invite = await Invite.update(req.body,{where:{id:req.params.id}});
      res.status(200).json(invite)
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

// delete an invite

router.delete('/:id', async(req, res) => {
    // delete a category by its `id` value
    try{
      const invite = await Invite.destroy({where:{id:req.params.id}});
      res.status(200).json(invite)
    } catch (err) {
      console.log(err)
    }
  });

  module.exports = router;