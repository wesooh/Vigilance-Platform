import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, location } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      location,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
  console.log("🔥 FULL LOGIN ERROR:", error);
  console.log("🔥 STACK:", error.stack);

  return res.status(500).json({
    message: error.message,
  });
}
};

export const getWorkers = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
    } = req.query;

    let query = {
      role: "worker",
    };

    // SEARCH BY NAME
    if (search) {
      query.$or = [
        {
          firstName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // FILTER CATEGORY
    if (category) {
      query.category = category;
    }

    // FILTER LOCATION
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    const workers = await User.find(query, {
      password: 0,
    });

    res.json(workers);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getWorkerById = async (req, res) => {
  try {
    const worker = await User.findById(
      req.params.id,
      {
        password: 0,
      }
    );

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    res.json(worker);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateWorkerProfile = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        message: "Worker not found",
      });
    }

    // UPDATE FIELDS
    worker.about =
      req.body.about || worker.about;

    worker.experience =
      req.body.experience ||
      worker.experience;

    worker.category =
      req.body.category ||
      worker.category;

    worker.skills =
      req.body.skills || worker.skills;

    worker.availability =
      req.body.availability ??
      worker.availability;

    // PRICE
    worker.price = {
      daily:
        req.body.price?.daily ??
        worker.price.daily,

      weekly:
        req.body.price?.weekly ??
        worker.price.weekly,

      monthly:
        req.body.price?.monthly ??
        worker.price.monthly,
    };

    const updatedWorker =
      await worker.save();

    res.json(updatedWorker);

  } catch (error) {
    console.log("LOGIN ERROR", error);
    res.status(500).json({
      message: error.message,
    });
  }
};