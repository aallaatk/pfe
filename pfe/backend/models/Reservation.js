import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tourId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
