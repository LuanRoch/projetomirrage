import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Products from "@/components/Produtcs";


export default function Home() {
  return (
    <div className=" w-full bg-[#ffefef] mx-auto flex flex-col items-center gap-16">

      <Hero />
      <About/>
      <Products />
      <Footer />
    </div>
  );
}
