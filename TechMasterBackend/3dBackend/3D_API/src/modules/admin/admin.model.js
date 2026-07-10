// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const adminSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Admin name is required"],
//       trim: true,
//       minlength: [3, "Name must be at least 3 characters"],
//       maxlength: [50, "Name cannot exceed 50 characters"],
//     },

//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [
//         /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//         "Please enter a valid email address",
//       ],
//     },

//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minlength: [8, "Password must be at least 8 characters"],
//       maxlength: [20, "Password cannot exceed 20 characters"],
//       select: false,
//     },

//     role: {
//       type: String,
//       enum: ["super_admin"],
//       default: "super_admin",
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     lastLogin: {
//       type: Date,
//       default: null,
//     },

//     resetPasswordToken: {
//       type: String,
//       default: null,
//     },

//     resetPasswordExpire: {
//       type: Date,
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// /**
//  * Hash password before saving
//  */
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);

//   next();
// });

// /**
//  * Compare entered password with hashed password
//  */
// adminSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Admin = mongoose.model("Admin", adminSchema);

// export default Admin;


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      // maxlength: [20, "Password cannot exceed 20 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["super_admin"],
      default: "super_admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Hash Password Before Saving
 */
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare Password
 */
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;