import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  encryptedMessage: String,
  aesKeyIv: String,
  timestamp: Date
});

export default mongoose.model('Message', MessageSchema);