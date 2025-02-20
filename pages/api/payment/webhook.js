import mercadopago from 'mercadopago';
import { PrismaClient } from "@prisma/client";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { id, type } = req.query;

    if (type === 'payment') {
      const paymentInfo = await mercadopago.payment.findById(Number(id));

      // Atualize o status do pedido no banco de dados usando Prisma
      await prisma.order.update({
        where: { paymentId: id },
        data: { status: paymentInfo.body.status },
      });
    }

    res.status(200).json({ message: 'Webhook recebido' });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ message: 'Erro ao processar webhook' });
  }
}