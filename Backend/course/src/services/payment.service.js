import stripe from 'stripe';

export const processPayment = async ({amount, currency, token}) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            token,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {}
        });

        return {
            status: paymentIntent.status,
            client_secret: paymentIntent.client_secret
        };
    } catch (error) {
        console.log('Error processing payment', error);
        return {
            status: 'failed',
            client_secret: ''
        }
    }
};