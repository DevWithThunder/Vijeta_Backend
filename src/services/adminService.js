const User = require("../models/User");
const Unauthorized = require("../utils/error_module/Unauthorized");
const { RETURN_STRINGS } = require("../config/defaults");
const Customer = require("../models/Customer");
const NotFound = require("../utils/error_module/NotFound");
const BadRequest = require("../utils/error_module/BadRequest");
const mongoose = require("mongoose");
const NotifyMessagesTemplate = require("../models/Templetes");

exports.dashboardInfo = async ({ userId }) => {
  // try {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw NotFound(RETURN_STRINGS.USER_NOT_FOUND);
  }
  return user;
  // } catch (error) {
  //   throw BadRequest(error?.message);
  // }
};

exports.getTotalUseCount = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }

  const count = await Customer.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
  });
  return { totalCustomers: count };
};

exports.getRemaindersCount = async (userId) => {
  try {
    // Validate the userId before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }

    const today = new Date();
    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7); // Calculate the date 7 days from today

    // Fetch customer documents
    const customers = await Customer.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    let totalRemainders = 0;

    // Calculate next haircut and shaving dates
    customers.forEach((customer) => {
      const nextHaircutDate = customer.lastHaircutDate
        ? new Date(
            customer.lastHaircutDate.getTime() +
              customer.haircut_duration * 7 * 24 * 60 * 60 * 1000
          )
        : null;

      const nextShavingDate = customer.lastShavingDate
        ? new Date(
            customer.lastShavingDate.getTime() +
              customer.shaving_duration * 24 * 60 * 60 * 1000
          )
        : null;

      // Check if the next haircut date is within the next seven days
      if (
        nextHaircutDate &&
        nextHaircutDate >= today &&
        nextHaircutDate <= sevenDaysFromNow
      ) {
        totalRemainders++;
      }

      // Check if the next shaving date is within the next seven days
      if (
        nextShavingDate &&
        nextShavingDate >= today &&
        nextShavingDate <= sevenDaysFromNow
      ) {
        totalRemainders++;
      }
    });

    return { totalRemainders };
  } catch (error) {
    throw error;
  }
};

exports.getTodaysBirthdayCount = async () => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    ); // Next day

    const count = await Customer.countDocuments({
      birthday: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
    });

    return { birthdayCount: count };
  } catch (error) {
    throw error.message;
  }
};

exports.getTop7Remainders = async (userId) => {
  try {
    // Validate the userId before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }

    const today = new Date(); // Define today's date

    // Fetch customer documents
    const customers = await Customer.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Create an array to hold remainders
    const remainders = [];

    // Calculate next haircut and shaving dates and filter by today's date
    customers.forEach((customer) => {
      const nextHaircutDate = customer.lastHaircutDate
        ? new Date(
            customer.lastHaircutDate.getTime() +
              customer.haircut_duration * 7 * 24 * 60 * 60 * 1000
          )
        : null;

      const nextShavingDate = customer.lastShavingDate
        ? new Date(
            customer.lastShavingDate.getTime() +
              customer.shaving_duration * 24 * 60 * 60 * 1000
          )
        : null;

      // Add to remainders array if the dates are due or past due
      if (nextHaircutDate && nextHaircutDate <= today) {
        remainders.push({ type: "haircut", date: nextHaircutDate, customer });
      }

      if (nextShavingDate && nextShavingDate <= today) {
        remainders.push({ type: "shaving", date: nextShavingDate, customer });
      }
    });

    // Sort the remainders by date (earliest first)
    remainders.sort((a, b) => a.date - b.date);

    // Limit to the top 7 remainders
    return remainders.slice(0, 7);
  } catch (error) {
    throw new Error(error.message); // Improved error handling
  }
};

exports.getAllClientsByUserId = async (userId) => {
  // Validate the userId before proceeding
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid userId");
  }
  // Find all customers for the specified userId
  const clients = await Customer.find({
    userId: new mongoose.Types.ObjectId(userId),
  });

  return clients; // This will return an array of customer objects
};

exports.getCustomerByCustomerId = async (userId, customerId) => {
  // Validate the userId and customerId before proceeding
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(customerId)
  ) {
    throw new Error("Invalid userId or customerId");
  }

  // Find the specific customer for the specified userId and customerId
  const customer = await Customer.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    _id: new mongoose.Types.ObjectId(customerId),
  });

  return customer; // This will return the customer object or null if not found
};

exports.getRemainderData = async (userId) => {
  try {
    // Validate the userId before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }

    const today = new Date(); // Define today's date

    // Fetch customer documents
    const customers = await Customer.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Create an array to hold remainders
    const remainders = [];

    // Calculate next haircut and shaving dates and filter by today's date
    customers.forEach((customer) => {
      const nextHaircutDate = customer.lastHaircutDate
        ? new Date(
            customer.lastHaircutDate.getTime() +
              customer.haircut_duration * 7 * 24 * 60 * 60 * 1000
          )
        : null;

      const nextShavingDate = customer.lastShavingDate
        ? new Date(
            customer.lastShavingDate.getTime() +
              customer.shaving_duration * 24 * 60 * 60 * 1000
          )
        : null;

      // Add to remainders array if the dates are due or past due
      if (nextHaircutDate && nextHaircutDate <= today) {
        remainders.push({ type: "Haircut", date: nextHaircutDate, customer });
      }

      if (nextShavingDate && nextShavingDate <= today) {
        remainders.push({ type: "Shaving", date: nextShavingDate, customer });
      }
    });

    // Sort the remainders by date (earliest first)
    remainders.sort((a, b) => a.date - b.date);

    // Limit to the top 7 remainders
    return remainders;
  } catch (error) {
    throw new Error(error.message); // Improved error handling
  }
};

exports.getNotificationTemplete = async (notificationType) => {
  const template = await NotifyMessagesTemplate.find({
    type: notificationType,
    isActive: true,
  });
  console.log("template::: ", template);
  if (!template) {
    throw new Error({ message: "Notification template not found" });
  }

  return template; // This will return the customer object or null if not found
};

exports.newCustomer = async (data) => {
  const {
    username,
    email,
    contact,
    dob,
    haircut_duration,
    shaving_duration,
    avatar,
    address,
    userId,
  } = data;

  // try {
  // Validate required fields
  if (!username || !contact || !dob || !haircut_duration || !haircut_duration) {
    throw BadRequest(RETURN_STRINGS.GENERIC_MISSING_FIELD_MSG);
  }

  // Create a new customer instance
  const newCustomer = await Customer.create({
    username,
    email,
    contact,
    dob,
    haircut_duration,
    shaving_duration,
    avatar,
    address,
    userId,
  });
  return {
    message: "Customer created successfully",
    customer: newCustomer,
  };
  // } catch (error) {
  //   console.error("Error creating customer:", error);
  //   res.status(500).json({ message: "Server error", error: error.message });
  // }
};

exports.getAllNotificationTempletes = async () => {
  const template = await NotifyMessagesTemplate.find({
    isActive: true,
  });
  if (!template) {
    throw new Error({ message: "Notification template not found" });
  }

  return template; // This will return the customer object or null if not found
};
