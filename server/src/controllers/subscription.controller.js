const Subscription = require('../models/subscription.model');
const { getSubscriptionDetailsByLevel } = require('../helper/getSubscriptionConfig');
const { stripe } = require('../configs/stripe');
const User = require('../models/user.model');

const createStripePaymentIntent = async (req, res) => {
  const { level } = req.params;
  const user = req.user;

  const subscription = getSubscriptionDetailsByLevel(level);

  if (!subscription) {
    return res.status(400).json({ message: 'Subscription not found' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subscription.price,
      currency: 'usd',
      metadata: {
        tier: subscription.level,
        userId: user._id,
        expiresIn: subscription.expiresIn,
      },
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: 'Error creating payment intent' });
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      amount: subscription.price,
    };

    res.send(response);
  } catch (err) {
    return res.status(500).json({ message: 'Stripe server Error' });
  }
};

const createSubscription = async (req, res) => {
  // const user = req.user;
  // 1. get user id, and intended subscription details(like pro or subs id) from req
  // 2. check if the user exists and if the user has any active subscription
  // 3. if the user doesnt have any active plans, create one with chosen plan.
  //    a. Create a payment entry in db with payment pending.
  //    b. Only if the payment is successfull add a entry to subscriptions db indicating the subscription is active
  //    c. Also update the user document to reflect the subscription level of the plan and subscription details.

  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: 'payment intent not found' });
    }

    if (paymentIntent.metadata.tier !== req.params.level || paymentIntent.metadata.userId !== req.user._id) {
      return res.status(400).json({ message: 'payment intent mismatch' });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    const calculatedExpiryDate = new Date(Date.now() + paymentIntent.metadata.expiresIn * 24 * 60 * 60 * 1000);

    const subscription = new Subscription({
      userId: user._id,
      expiresAt: calculatedExpiryDate,
    });

    await subscription.save();

    const user = await User.findOneAndUpdate(
      { _id: user._id },
      {
        subscriptionLevel: paymentIntent.metadata.tier,
      }
    );

    res.status(200).json({ message: 'Subscription is now active', subscription });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getSubscriptionDetails = async (req, res) => {
  // Subscription.findById(subscriptionId)
  //   .populate('userId') // Populate the related user details
  //   .exec((err, subscription) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log(subscription);
  //     }
  //   });
};

module.exports = { createStripePaymentIntent, createSubscription };

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
