"use client";

import Image from "next/image";
import { Quote, Star, User } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Kita definisikan tipe data di sini
type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string | null;
};

export default function TestimonialSlider({ data }: { data: Testimonial[] }) {
  return (
    <div className="px-4 md:px-8">
        <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        }}
        className="!pb-16"
        >
        {data.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 h-full flex flex-col relative shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                
                {/* Decorative Quote */}
                <Quote className="absolute top-6 right-6 text-maroon-primary/10 w-12 h-12 rotate-180 group-hover:text-maroon-primary/20 transition-colors" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold-primary text-gold-primary" />
                ))}
                </div>

                {/* Content */}
                <p className="font-serif text-lg text-gray-700 italic leading-relaxed mb-8 flex-grow">
                "{item.content}"
                </p>

                {/* Profile Section */}
                <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                    {/* Avatar Image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-white shadow-md shrink-0 relative">
                        {item.image ? (
                        <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                            sizes="48px"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-maroon-primary to-black text-white font-bold text-lg">
                            {item.name.charAt(0)}
                        </div>
                        )}
                    </div>
                    
                    {/* Name & Role */}
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-maroon-primary transition-colors">
                            {item.name}
                        </h4>
                        <p className="text-xs text-gold-primary font-bold uppercase tracking-wide mt-0.5">
                            {item.role}
                        </p>
                    </div>
                </div>
            </div>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
}