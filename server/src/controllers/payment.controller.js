import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

router.post('/:hotelId/bookings/payment-intent', verifyToken, async (req, res) => {
  const { numberOfNights } = req.body;
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(400).json({ message: 'Hotel not found' });
  }

  let totalCost = hotel.pricePerNight * numberOfNights;
  if (!numberOfNights) {
    totalCost = hotel.pricePerNight;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: 'inr',
    metadata: {
      hotelId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: 'Error creating payment intent' });
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);
});

router.post('/:hotelId/bookings', verifyToken, async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: 'payment intent not found' });
    }

    if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
      return res.status(400).json({ message: 'payment intent mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const newBooking = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      return res.status(400).json({ message: 'hotel not found' });
    }

    await hotel.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
});
