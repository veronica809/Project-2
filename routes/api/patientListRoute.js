const { Patientlist } = require("../../models");
const { User } = require("../../models");

const router = require("express").Router();

// get all patients
router.get("/", async (req, res) => {
  try {
    const patientlist = await Patientlist.findAll({});
    res.status(200).json(patientlist);
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

// get patient by id
router.get("/:patientlistId", async (req, res) => {
  try {
    const patientlist = await Patientlist.findOne({
      where: {
        id: req.params.patientlistId,
      },
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "username",
          "firstname",
          "lastname",
          "dob",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    if (!Patientlist) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    res.status(200).json(patientList);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/patient/:patientlistId", async (req, res) => {
  try {
    console.log("reaching the route");
    console.log(req.params);
    const patientlist = await Patientlist.findOne({
      where: {
        id: req.params.patientlistId,
      },
    });

    if (!patientlist) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    console.log(patientlist.dataValues);
    res.render("patientview", patientlist.dataValues);
    // res.status(200).json(patientlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//post new patient check in
router.post("/", async (req, res) => {
  var isolation = false;
  if (
    req.body.covidexposed ||
    req.body.influenzaexposed ||
    req.body.tuberculosisexposed
  ) {
    isolation = true;
    console.log("it's working");
  }
  var urgent = false;
  if (req.body.chestpain || req.body.shortbreath) {
    urgent = true;
  }

  console.log("reaching the backend route");
  console.log(req.body);
  try {
    await Patientlist.create({
      ...req.body,
      urgent: urgent,
      isolationrequired: isolation,
      user_id: req.session.userId,
    });
    // res.status(201).json({ message: "Patient added to list" });
    res.redirect("/newpatient");
  } catch (err) {
    res.status(500).json(err);
  }
});

//put todo by id

//delete todo by id

module.exports = router;
