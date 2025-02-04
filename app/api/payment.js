// pages/api/payment.js
import mercadopago from '../../lib/mercadopago';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items, payer } = req.body;

    try {
      const preference = {
        items: items.map(item => ({
          title: item.name,
          unit_price: parseFloat(item.price),
          quantity: item.quantity,
        })),
        payer: {
          email: payer.email,
        },
        back_urls: {
          success: 'https://seusite.com/success',
          failure: 'https://seusite.com/failure',
          pending: 'https://seusite.com/pending',
        },
        auto_return: 'approved',
      };

      const response = await mercadopago.preferences.create(preference);
      res.status(200).json({ id: response.body.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}