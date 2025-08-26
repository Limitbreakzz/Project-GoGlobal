// Description.jsx
import React from 'react'
import featuredCountries from '../Data/Asia_region_featured'

const Description = () => {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-center text-2xl font-bold mb-3">แนะนำประเทศ</h2>
      <p className="text-center text-gray-600 mb-8">
        จากการคัดสรรข้อมูลเชิงลึกที่ครอบคลุม สำรวจหลากหลายประเทศในภูมิภาคเอเชีย
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredCountries.map((country) => (
          <div
            key={country.name}
            className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition"
          >
            <img
              src={country.image}
              alt={country.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-semibold">{country.name}</h3>
              <a
                href={country.link}
                className="text-sm bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600"
              >
                ดูเพิ่มเติม
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Description
