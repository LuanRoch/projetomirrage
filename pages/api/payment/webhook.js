import mercadopago from 'mercadopago';
import { PrismaClient } from '@prisma/client';

// Configura o SDK do Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Inicializa o Prisma Client
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, type } = req.body;

      // Verifica se o tipo de notificação é um pagamento
      if (type === 'payment') {
        // Busca os detalhes do pagamento no Mercado Pago
        const payment = await mercadopago.payment.findById(id);
        const { status, external_reference } = payment.body;

        // Log para depuração
        console.log(`Payment ID: ${id}, Status: ${status}, External Reference: ${external_reference}`);

        // Valida o external_reference
        if (external_reference) {
          // Verifica se o pedido existe no banco de dados
          const order = await prisma.order.findUnique({
            where: { id: external_reference },
          });

          if (order) {
            // Atualiza o status do pedido no banco de dados
            await prisma.order.update({
              where: { id: external_reference },
              data: { status },
            });
            console.log(`Status do pedido ${external_reference} atualizado para: ${status}`);
          } else {
            console.error('Pedido não encontrado no banco de dados.');
          }
        } else {
          console.error('External Reference não encontrado no pagamento.');
        }
      }

      // Responde ao Mercado Pago que a notificação foi recebida com sucesso
      res.status(200).json({ message: 'Webhook received' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    // Retorna erro se o método HTTP não for POST
    res.status(405).json({ message: 'Method not allowed' });
  }
}