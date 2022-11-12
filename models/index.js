const User = require('./User');
const Event = require('./Event');
const Invite = require('./Invite');

User.hasMany(Event, {
  foreignKey: 'event_creator',
  onDelete: 'CASCADE'
});

Event.hasMany(Invite, {
  foreignKey: 'event_id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'event_creator'
});
Invite.belongsTo(User, {
  foreignKey: 'user_id'
});
Invite.belongsTo(Event, {
  foreignKey: 'event_id'
});

module.exports = { User, Event, Invite };
