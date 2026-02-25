import { GraduationCap, BookOpen, School } from "lucide-react";

export default function FloatingCards() {
  const cards = [
    {
      title: "Pendidikan Formal",
      icon: <School size={40} className="text-maroon-primary" />,
      items: ["SD Mabadi'ul Ihsan", "SMP Plus Cordova", "Mts Mabadi'ul Ihsan", "SMA Plus Cordova", "SMK Cordova", "Universitas Terbuka", "Universitas Cordoba"],
      color: "border-l-4 border-maroon-primary"
    },
    {
      title: "Pendidikan Non-Formal",
      icon: <BookOpen size={40} className="text-gold-primary" />,
      items: ["Madrasah Diniyah Takmiliyah", "TPQ Mabadi'ul Ihsan", "Program Tahfidzul Qur'an"],
      color: "border-l-4 border-gold-primary"
    },
    {
      title: "Program Pesantren",
      icon: <GraduationCap size={40} className="text-maroon-dark" />,
      items: ["Program Tahfidz", "Kajian Kitab Kuning", "Pembinaan Akhlaq", "Bahasa Arab & Inggris"],
      color: "border-l-4 border-maroon-dark"
    }
  ];

  return (
    <section className="relative z-30 -mt-16 md:-mt-24 pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-xl shadow-xl hover:-translate-y-2 transition-transform duration-300 ${card.color}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-full shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 leading-tight">
                  {card.title}
                </h3>
              </div>
              
              <ul className="space-y-2">
                {card.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}