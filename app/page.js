import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Produtcs";


export default function Home() {
  return (
    <div className="container w-full bg-[#F5A09B] mx-auto flex flex-col items-center gap-16">
      <Hero />
      <Products />
      <Footer />
    </div>
  );
}
