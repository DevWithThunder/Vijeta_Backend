const adminService = require("../services/adminService");

exports.dashboardInfo = async (req, res) => {
  try {
    const admin = await adminService.dashboardInfo(req.body);
    console.log("admin::: ", admin);
    const totalCount = await adminService.getTotalUseCount(admin?._id);
    console.log("totalCount::: ", totalCount);
    const remainderCount = await adminService.getRemaindersCount(admin?._id);
    console.log("remainderCount::: ", remainderCount);
    const getTodaysBirthdayCount = await adminService.getTodaysBirthdayCount(
      admin?._id
    );
    console.log("getTodaysBirthdayCount::: ", getTodaysBirthdayCount);
    const customers = await adminService.getTop7Remainders(admin?._id);
    console.log("customers::: ", customers);
    res.status(200).json({
      totalCustomers: totalCount?.totalCustomers,
      remainderCount: remainderCount?.totalRemainders,
      getTodaysBirthdayCount: getTodaysBirthdayCount?.birthdayCount,
      customers,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.getAllCustomersByUserId = async (req, res) => {
  try {
    const admin = await adminService.dashboardInfo(req.body);
    const customers = await adminService.getAllClientsByUserId(admin?._id);

    res.status(200).json({
      customers,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.getCustomerByCustomerId = async (req, res) => {
  try {
    const admin = await adminService.dashboardInfo(req.body);
    const customerInfo = await adminService.getCustomerByCustomerId(
      admin?._id,
      req.body.id
    );

    res.status(200).json({
      customerInfo,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.getRemainderData = async (req, res) => {
  try {
    const admin = await adminService.dashboardInfo(req.body);
    const remainderData = await adminService.getRemainderData(admin?._id);
    res.status(200).json({
      remainderData,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.getMessageInfo = async (req, res) => {
  try {
    const admin = await adminService.dashboardInfo(req.body);
    const customerInfo = await adminService.getCustomerByCustomerId(
      admin?._id,
      req.body.id
    );
    console.log("customerInfo::: ", customerInfo);
    const templeteData = await adminService.getNotificationTemplete(
      req.body.type
    );
    res.status(200).json({
      customerInfo,
      templeteData,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.newCustomer = async (req, res) => {
  try {
    const newEntry = await adminService.newCustomer(req.body);
    res.status(200).json({
      newEntry,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};

exports.getAllNotificationTempletes = async (req, res) => {
  try {
    const notificationTemplets =
      await adminService.getAllNotificationTempletes();
    res.status(200).json({
      notificationTemplets,
    });
  } catch (error) {
    console.log("error::: ", error);
    res.status(error?.code || 500).json(error);
  }
};
