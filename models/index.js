const User = require("./User");
const Patientlist = require("./patientList");

// User.hasMany(Todo, {
//   foreignKey: "user_id",
//   onDelete: "set null",
// });

// Todo.belongsTo(User, {
//   foreignKey: "user_id",
//   onDelete: "cascade",
// });

User.hasMany(Patientlist, {
  as: "patientlist",
});
Patientlist.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = {
  User,
  Patientlist,
};
