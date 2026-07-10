import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID is required"],
    },
    adminName: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
    },
    action: {
      type: String,
      required: [true, "Action is required"],
    },
    module: {
      type: String,
      default: "Founder Journey",
      required: [true, "Module name is required"],
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
