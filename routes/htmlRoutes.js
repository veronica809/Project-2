const router = require("express").Router();

// HTML ROUTES
// GET / - home page
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("registerUser");
});
router.get("/newpatient", (req, res) => {
  res.render("patientQuestions");
});
router.get("/existingpatient", (req, res) => {
  res.render("existingpatient");
});
router.get("/patientQueue", (req, res) => {
  res.render("patientQueue");
});

module.exports = router;
