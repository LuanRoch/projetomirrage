// pages/api/webhook.js
import mercadopago from '../../lib/mercadopago';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, topic } = req.body;

    if (topic === 'payment') {
      try {
        const payment = await mercadopago.payment.findById(id);
        // Atualize o status do pagamento no seu banco de dados
        console.log(payment);
        res.status(200).json({ message: 'Webhook received' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ message: 'Invalid topic' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}