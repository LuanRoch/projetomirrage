import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configura o cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// Cria uma instância de Preference
const preference = new Preference(client);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { items } = req.body;

    // Cria a preferência de pagamento
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.title,
          unit_price: Number(item.price),
          quantity: item.quantity || 1,
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/paymentSuccess`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/paymentFailure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/pending`,
        },
        auto_return: 'approved',
      },
    });

    res.status(200).json({ checkoutUrl: response.init_point });
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    res.status(500).json({ message: 'Erro ao processar o pagamento' });
  }
}