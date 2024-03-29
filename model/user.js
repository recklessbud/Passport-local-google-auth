const mongoose =  require("mongoose")
const bcrypt = require("@node-rs/bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
    sparse: true
  },
  password:{
    type: String,
  },
  googleId: {
    type: String,
  }
}, {timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = async function comparePassword(candidatePassword, cb) {
  try {
    cb(null, await bcrypt.verify(candidatePassword, this.password));
  } catch (err) {
    cb(err);
  }
};

const user = mongoose.model("user", userSchema)

module.exports = user