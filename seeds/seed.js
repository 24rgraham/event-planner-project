const sequelize = require("../config/connection");
const { User, Event, Invite } = require("../models");

const userData = [
  {
    name: "John Cusack",
    email: "john@cusack.com",
    password: "Iamjohn",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "password12345",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "password12345",
  },
  {
    name: "Jack Sparrow",
    email: "jack@sparrow.com",
    password: "Iamthecaptain",
  },
  {
    name: "Bugs Bunny",
    email: "bug@bunny.com",
    password: "thisaintalbaquerque",
  },
  {
    name: "Harry Potter",
    email: "yourawizard@harry.com",
    password: "voldemort",
  },
];

const eventData = [
    {
        name: "Harry's half birthday party",
        eventDate: "2022-11-30",
        time: "10:00",
        location: "Malfoy Manor",
        description: "Come celebrate my big day! Eat yourself to death with our death-eater cake! Polyjuice potion on the house!",
        isPrivate: false,
        event_creator: 4
    },
    {
        name: "Captain Jack Sparrow's Send-Off Bash",
        eventDate: "2022-11-25",
        time: "01:00",
        location: "Tortuga",
        description: "Where's the rum gone? We bought it all up for my big going away sendoff! Where am I going? Davy Jones' locker!!",
        isPrivate: false,
        event_creator: 4
    },
]

const inviteData = [
    {
        name: "Jacob Marcus",
        event_id: 1,
        response: "Going"
    },
    {
        name: "John Cusack",
        invitee_id: 1,
        event_id: 1,
        response: "Going"
    },
    {
        name: "Daffy Duck",
        event_id: 1,
        response: "Maybe"
    },
    {
        name: "Bugs Bunny",
        invitee_id: 4,
        event_id: 2,
        response: "Maybe"
    },
    {
        name: "Michael Jordan",
        event_id: 1,
        response: "Going"
    },
    {
        name: "Lernantino",
        invitee_id: 1,
        event_id: 2,
        response: "Maybe"
    },
]

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    const events = await Event.bulkCreate(eventData);
  
    const invites = await Invite.bulkCreate(inviteData);
  };
  
  seedDatabase();