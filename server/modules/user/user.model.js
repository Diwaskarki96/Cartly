import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 3, maxLength: 15 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 15 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    profileImage: {
      type: String,
      required: false,
      default:
        "https://imgs.search.brave.com/yeOvOjjaYfOU4TUMqxEPho3FhjeZkfUxVHBkCcAQt-g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ianMu/c2NlbmU3LmNvbS9p/cy9pbWFnZS9ianMv/MzMyNjExPyRianMt/SW5pdGlhbDYwMCQ.jpeg",
    },
  },
  { timestamps: true }
);
export const userModel = mongoose.model("User", userSchema);
