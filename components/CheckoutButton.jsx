"use client"; // Certifique-se de que este componente é executado no cliente
import { useEffect, useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { cartItems } from "@/hooks/useCart"

export function CheckoutButton({ cartItems }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Carrega o SDK do Mercado Pago
        loadMercadoPago();
    }, []);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            // Cria a preferência de pagamento no backend
            const response = await fetch("/api/payment/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cartItems,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro ao processar o pagamento");
            }

            const { checkoutUrl } = await response.json();

            // Redireciona o usuário para o checkout do Mercado Pago
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error("Erro ao processar checkout:", error);
            alert("Erro ao processar o pagamento. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? "Processando..." : "Finalizar Compra"}
        </button>
    );
}