const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/info", adminController.dashboardInfo);
router.post("/allclients", adminController.getAllCustomersByUserId);
router.post("/get-customer-info", adminController.getCustomerByCustomerId);
router.post("/get-remainders-data", adminController.getRemainderData);
router.post("/get-message-info", adminController.getMessageInfo);
router.post("/new-customer", adminController.newCustomer);
router.get("/get-templetes", adminController.getAllNotificationTempletes);

module.exports = router;
