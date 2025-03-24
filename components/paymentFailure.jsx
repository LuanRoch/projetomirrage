'use client';

import Head from "next/head";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const PaymentFailure = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <Head>
        <title>Pagamento Não Aprovado | Mercado Pago</title>
        <meta name="description" content="Ocorreu um problema com seu pagamento" />
      </Head>

      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Pagamento Não Aprovado</h1>
        <p className="text-muted-foreground mb-6">
          Ocorreu um problema ao processar seu pagamento. Por favor, tente novamente.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
          <p className="text-red-700 dark:text-red-300 font-medium">
            Possíveis motivos:
          </p>
          <ul className="text-red-600 dark:text-red-200 text-sm mt-2 text-left list-disc pl-5">
            <li>Saldo insuficiente</li>
            <li>Problemas com o cartão</li>
            <li>Limite excedido</li>
            <li>Dados incorretos</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push('/checkout')}
          >
            Tentar novamente
          </Button>
          <Button
            className="w-full"
            onClick={() => router.push('/')}
          >
            Voltar para a página inicial
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Em caso de dúvidas, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
};