'use client';
import Head from "next/head";
import { Button } from "./ui/button";


export const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <Head>
        <title>Pagamento Aprovado | Mercado Pago</title>
        <meta name="description" content="Seu pagamento foi processado com sucesso" />
      </Head>

      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Pagamento Aprovado!</h1>
        <p className="text-muted-foreground mb-6">
          Seu pagamento foi processado com sucesso. Obrigado por sua compra!
        </p>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
          <p className="text-green-700 dark:text-green-300 font-medium">
            O número do seu pedido é: <span className="font-bold">MP-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
          </p>
          <p className="text-green-600 dark:text-green-200 text-sm mt-2">
            Você receberá um e-mail com os detalhes da compra.
          </p>
        </div>

        <Button
          className="w-full"
          onClick={() => {
            // Redirecionar para a página inicial ou de pedidos
            window.location.href = '/';
          }}
        >
          Voltar para a página inicial
        </Button>

        <p className="text-sm text-muted-foreground mt-6">
          Em caso de dúvidas, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
};