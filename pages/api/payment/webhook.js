import mercadopago from 'mercadopago';
import { PrismaClient } from "@prisma/client";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
      try {
          const { id, type } = req.body;

          if (type === 'payment') {
              // Busca os detalhes do pagamento no Mercado Pago
              const payment = await mercadopago.payment.findById(id);
              const { status, external_reference } = payment.body;

              // Aqui você pode atualizar o status do pedido no seu banco de dados
              console.log(`Payment ID: ${id}, Status: ${status}, External Reference: ${external_reference}`);

              // Exemplo: Atualizar o status do pedido no banco de dados
              // await prisma.order.update({
              //     where: { id: external_reference },
              //     data: { status },
              // });
          }

          res.status(200).json({ message: 'Webhook received' });
      } catch (error) {
          console.error('Error processing webhook:', error);
          res.status(500).json({ error: error.message });
      }
  } else {
      res.status(405).json({ message: 'Method not allowed' });
  }
}