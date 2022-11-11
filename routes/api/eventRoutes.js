const router = require('express').Router();
const { User, Event} = require('../../models');

//get all
router.get('/',(req,res)=>{
    Event.findAll({
        // include:[User]
    }).then(eventData=>{
        res.json(eventData)
    }).catch(err=>{
        res.status(500).json({msg:"An error has occurred",err})
    })
  })

//get one event
router.get('/:id', (req,res) => {
    Event.findByPk(req.params.id)
    .then((event)=>{
        res.json(event)
    }).catch ((err) => {
        console.log(err);
        res.status(500).json({err:err})
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
            description: req.body.description,
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
        description: req.body.description,
        event_creator: req.body.event_creator
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then((updatedEvent)=> {
        if(updatedEvent[0] === 0) {
            return res.status(404).json({msg: "no event found"});
          }
          res.json(updatedEvent)
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ err: err});
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