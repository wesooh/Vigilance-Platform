import User from "../models/User.js";

/**
 * Checks if a worker profile is complete
 * and updates database flags automatically.
 */
export const checkWorkerProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) return null;

  // Only apply to workers
  if (user.role !== "worker") return user;

  // =========================
  // REQUIRED FIELDS (STRICT)
  // =========================
  const isComplete =
    user.firstName &&
    user.lastName &&
    user.email &&
    user.location &&
    user.idNumber &&
    user.idFrontImage &&
    user.idBackImage &&
    user.about &&
    user.skills?.length > 0 &&
    user.experience &&
    user.profileImage;

  // =========================
  // UPDATE STATUS LOGIC
  // =========================
  user.isProfileComplete = !!isComplete;

  user.verificationStatus = isComplete
    ? "pending" // ready for OTP / admin approval next
    : "incomplete";

  await user.save();

  return user;
};