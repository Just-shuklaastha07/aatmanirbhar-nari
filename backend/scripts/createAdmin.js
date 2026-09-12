const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      ADMIN_MOBILE,
      ADMIN_CITY,
    } = process.env;

    if (
      !ADMIN_NAME ||
      !ADMIN_EMAIL ||
      !ADMIN_PASSWORD ||
      !ADMIN_MOBILE ||
      !ADMIN_CITY
    ) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_MOBILE and ADMIN_CITY are required."
      );
    }

    const existingAdmin = await User.findOne({
      $or: [
        { email: ADMIN_EMAIL.toLowerCase() },
        { mobile: ADMIN_MOBILE },
      ],
    });

    if (existingAdmin) {
      console.log(
        `A user already exists with this email or mobile number. Role: ${existingAdmin.role}`
      );
      return;
    }

    const admin = await User.create({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      mobile: ADMIN_MOBILE,
      city: ADMIN_CITY,
      language: "English",
      role: "admin",
      isActive: true,
    });

    console.log("Admin account created successfully.");
    console.log(`Name: ${admin.fullName}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();