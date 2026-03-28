const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      required: false,
      trim: true
    },
    typeSite: {
      type: String,
      required: true,
      trim: true,
      enum: ["vitrine", "ecommerce", "blog"],
      default: "vitrine"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);