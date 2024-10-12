const Subscription = require('../models/subscription.model');
const { getSubscriptionDetailsByTier } = require('../helper/getSubscriptionConfig');
const { stripe } = require('../configs/stripe');
const User = require('../models/user.model');

const createStripePaymentIntent = async (req, res) => {
  const { tier } = req.params;
  const { userId } = req.user;
  console.log('User:', userId);

  const subscription = getSubscriptionDetailsByTier(tier);
  console.log('Subscription:', subscription);

  if (!subscription) {
    return res.status(400).json({ message: 'Subscription not found' });
  }

  const amountInCents = Math.round(subscription.price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: {
        tier: subscription.name,
        level: subscription.level,
        userId,
        expiresIn: subscription.expiresIn,
      },
    });

    console.log('PaymentIntent:', paymentIntent);

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: 'Error creating payment intent: No client secret' });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      amount: amountInCents,
    };
    console.log('Response:', response);

    res.status(201).send(response);
  } catch (err) {
    console.error('Stripe Error:', err);
    return res.status(500).json({ message: 'Stripe server Error', error: err.message });
  }
};

const createSubscription = async (req, res) => {
  const { userId } = req.user;
  const { tier } = req.params;
  console.log('userId', userId);

  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: 'payment intent not found' });
    }

    if (paymentIntent.metadata.tier !== tier || paymentIntent.metadata.userId !== userId) {
      return res.status(400).json({ message: 'payment intent mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const calculatedExpiryDate = new Date(Date.now() + paymentIntent.metadata.expiresIn * 24 * 60 * 60 * 1000);

    const subscription = new Subscription({
      userId,
      expiresAt: calculatedExpiryDate,
    });

    await subscription.save();

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        subscriptionLevel: paymentIntent.metadata.level,
      }
    );
    await user.save();
    
    const subscriptionTier = getSubscriptionDetailsByTier(paymentIntent.metadata.tier);
    const shareLimits = subscriptionTier.features;
    console.log('user after sub update', user);
    console.log('subscriptionTier:', subscription);
    console.log('shareLimits:', shareLimits);

    const updatedUser = {
      userId: user._id,
      userName: user.userName,
      email: user.email,
      subscriptionLevel: paymentIntent.metadata.level,
      shareLimits,
    };
    console.log('paymentIntent.metadata.level', paymentIntent.metadata.level);

    res.status(200).json({ message: 'Subscription is now active', subscription, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getSubscriptionDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const subscription = await Subscription.findOne({ userId, isExpired: false });

    if (!subscription) {
      res.status(400).json({ message: 'Subscription details not found' });
    }
    res.status(200).json({ message: 'Subscription details fetched', subscription });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { createStripePaymentIntent, createSubscription, getSubscriptionDetails };

// try {
//   const paymentIntentId = req.body.paymentIntentId;

//   const paymentIntent = await stripe.paymentIntents.retrieve(
//     paymentIntentId as string
//   );

//   if (!paymentIntent) {
//     return res.status(400).json({ message: "payment intent not found" });
//   }

//   if (
//     paymentIntent.metadata.hotelId !== req.params.hotelId ||
//     paymentIntent.metadata.userId !== req.userId
//   ) {
//     return res.status(400).json({ message: "payment intent mismatch" });
//   }

//   if (paymentIntent.status !== "succeeded") {
//     return res.status(400).json({
//       message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
//     });
//   }

//   const newBooking: BookingType = {
//     ...req.body,
//     userId: req.userId,
//   };

//   const hotel = await Hotel.findOneAndUpdate(
//     { _id: req.params.hotelId },
//     {
//       $push: { bookings: newBooking },
//     }
//   );

//   if (!hotel) {
//     return res.status(400).json({ message: "hotel not found" });
//   }

//   await hotel.save();
//   res.status(200).send();
// } catch (error) {
//   console.log(error);
//   res.status(500).json({ message: "something went wrong" });
// }
// }
