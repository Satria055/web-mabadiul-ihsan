import { prisma } from "@/lib/prisma";
import TestimonialSlider from "./TestimonialSlider";

export default async function Testimonials() {
  // AMBIL DATA DARI DB (Server Side Fetching)
  const testimonials = await prisma.testimonial.findMany({
    take: 6, // Ambil 6 terbaru untuk slider
    orderBy: { createdAt: "desc" },
    where: { isShow: true }
  });

  // Jika kosong, jangan render section ini
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      
      {/* Background Pattern (Opsional: Memberikan kesan mahal) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-maroon-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="container-custom relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
            — Suara Keluarga Besar —
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-maroon-primary mb-4">
            Kata Mereka Tentang Kami
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Pengalaman nyata dari alumni, wali santri, dan tokoh masyarakat yang telah menjadi bagian dari perjalanan kami.
          </p>
        </div>

        {/* Panggil Client Component Slider & Oper Datanya */}
        <TestimonialSlider data={testimonials} />

      </div>
    </section>
  );
}