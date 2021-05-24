/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51HUyKGCM2FrEvLYrdv9Yxx1N9rbkzJpT0VLOCggyDlYiaLRxSLhQ2vbBcmKlpczbsbgvSUBY2iseWeYx9fBR129A00zWn3o9IO'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
