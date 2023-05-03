const datatableController = require("../controllers/DatatableController");

const router = require("express").Router();

router.get("/get_data", datatableController.getAllUsers);

module.exports = router;