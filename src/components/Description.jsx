import React from 'react'
import { Link } from 'react-router-dom'
import { countriesData } from '../Data/countries'

const Description = () => {
  // เลือกประเทศตัวอย่าง 6 ประเทศ
  const featuredCountries = countriesData.slice(0, 6)

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-gray-800 text-center text-2xl font-bold mb-3">แนะนำประเทศ</h2>
      <p className="text-center text-gray-600 mb-8">
        จากการคัดสรรข้อมูลเชิงลึกที่ครอบคลุม สำรวจหลากหลายประเทศในภูมิภาคเอเชีย
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredCountries.map((country) => (
          <Link
            to={`/country/${encodeURIComponent(country.name)}`}
            key={country.name}
            className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition flex flex-col"
          >
            {country.image && (
              <img
                src={country.image}
                alt={country.name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-semibold">{country.name}</h3>
              <span className="text-sm bg-[#A4EBF3] text-white px-3 py-1 rounded-lg hover:bg-[#51C2D5]">
                ดูเพิ่มเติม
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Description
