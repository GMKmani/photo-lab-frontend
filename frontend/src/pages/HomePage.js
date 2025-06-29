import React from 'react'
import gallery1 from '../assets/gallery-1.jpg'
import gallery2 from '../assets/gallery-2.jpeg';
import gallery3 from '../assets/gallery-3.webp';

const galleryImages = [gallery1, gallery2, gallery3];


export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br bg-gray-100 py-12 px-6">
      {/* Main content grows to fill space */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 rounded-xl shadow-xl mb-12 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="About Photo Lab"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm px-8 py-4 rounded-lg shadow-md">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                About Our Photo Lab
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Welcome to{' '}
            <span className="font-bold text-pink-600">Photo Lab</span> – your one-stop destination for capturing and preserving life’s most
            precious moments. We specialize in custom-designed wedding albums,
            high-definition printing, elegant photo frames, and personalized
            gifts. With a passion for perfection and the latest printing
            technology, we promise vibrant, lasting quality in every product.
          </p>
        </div>

        {/* Highlights */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              'Creative Designers',
              'Premium Quality Prints',
              'Fast Delivery',
              'Affordable Prices',
            ].map((text, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md border-t-4 border-pink-500"
              >
                <p className="text-lg font-semibold text-gray-800">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-6xl mx-auto text-center mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl shadow hover:scale-105 transition transform duration-300"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-2">📞 Phone: +91 9705796333</p>
          <p className="mb-2">📧 Email: contact@photolab.com</p>
          <p>📍 6-3-115/1, Court Rd, opp. MAHABUBABAD LIBRARY, Mahabubabad, Telangana 506101</p>
        </div>
      </footer>
    </div>
  )
}
