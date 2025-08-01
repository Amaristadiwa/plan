import React from "react";
import { GiDress, GiFlowerPot, GiDiamondRing, GiCastle, GiCakeSlice, GiHighHeel } from "react-icons/gi";

const items = [
  {
    icon: <GiDress size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/5f/8b/11/5f8b1123cc2191de2c0134710d4e779c.jpg",
    label: "Dress Inspiration",
  },
  {
    icon: <GiFlowerPot size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/f7/13/d2/f713d2a4e4ea60cbe2c9116b3e3ac1c2.jpg",
    label: "Floral Setup",
  },
  {
    icon: <GiDiamondRing size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/92/f4/ce/92f4cec6edfe8f14d94dd8c64a870a35.jpg",
    label: "Rings & Details",
  },
  {
    icon: <GiCastle size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/94/0e/e2/940ee22696b50e3c1b424a578a2eb7a0.jpg",
    label: "Venue Ideas",
  },
  {
    icon: <GiCakeSlice size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/12/b4/f0/12b4f0cdd42c163c17f3940a2b4c6e0c.jpg",
    label: "Cake Designs",
  },
  {
    icon: <GiHighHeel size={36} className="text-pink-500 mx-auto mb-2" />,
    src: "https://i.pinimg.com/564x/65/cb/70/65cb70c4b27e622d5f2e147ec45fd8c5.jpg",
    label: "Bridesmaid Looks",
  },
];

export default function Gallery() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-white to-pink-50 text-center">
      <h3 className="text-4xl font-bold text-pink-600 mb-12 font-serif">
        Wedding Inspiration Gallery ✨
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-md bg-white transform hover:scale-105 transition duration-300 animate-fadeIn"
            style={{ animationDelay: `${i * 0.2}s`, animationFillMode: "both" }}
          >
            {item.icon}
            <img
              src={item.src}
              alt={item.label}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-pink-500 font-medium text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
