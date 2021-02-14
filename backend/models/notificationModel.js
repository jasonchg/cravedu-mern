import mongoose from 'mongoose'

const form = mongoose.Schema(
  {
    title: { type: String, required: true },
    from: { type: String, required: true },
    message: {
      type: String,
      required: true,
    },
    read: { type: Boolean, default: false },
    qandaId: {
      type: String,
    },
  },
  { timestamps: true }
)

const notificationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  notification: form,
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
