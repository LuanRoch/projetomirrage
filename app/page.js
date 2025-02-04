import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Produtcs";

export default function Home() {
  return (
    <div className="pt-16 container w-full bg-[#F5A09B] mx-auto px-4 flex flex-col items-center gap-16">
      <Hero />
      <Products />
      <Footer />
    </div>
  );
}
