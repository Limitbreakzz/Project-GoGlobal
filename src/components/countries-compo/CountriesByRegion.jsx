// src/components/countries-compo/CountriesByRegion.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { REGIONS, useFilteredCountries } from "./CountriesData";
import { countriesData } from "../../Data/countries"; 

export default function CountriesByRegion() {
  const region = REGIONS[0];
  const [activeSection, setActiveSection] = useState(region.sections[0].id);
  const [query, setQuery] = useState("");
  const { section, countries } = useFilteredCountries(region, activeSection, query);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const visibleCountries = countries.filter(
    (c) => !showOnlyFavorites || favorites.has(c)
  );

  function toggleFavorite(country) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(country)) next.delete(country);
      else next.add(country);
      return next;
    });
  }

  // หา icon ของประเทศ (เรียกรูปภาพเป็นสี่เหลี่ยม)
  function getIcon(countryName) {
    const country = countriesData.find((c) => c.name === countryName);
    return (
      <img
        src={country ? country.icon : "/icons/default.png"}
        alt={countryName}
        className="w-15 h-10 rounded-md object-cover bg-gray-100 p-1"
      />
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen w-full px-6 py-12 flex flex-col items-center pt-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Title */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-12 w-1 bg-[#0D0E0E] rounded-full" />
          <h1 className="text-4xl font-bold text-gray-800">
            {region.title_th} — {region.title_en}
          </h1>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {region.sections.map((s) => (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveSection(s.id); setQuery(""); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                s.id === activeSection
                  ? "bg-white text-gray-800"
                  : "bg-[#0D0E0E] text-white hover:bg-[#100E09]"
              }`}
            >
              {s.title_th} · {s.title_en}
            </motion.button>
          ))}
        </motion.div>

        {/* Search + Controls */}
        <div className="flex gap-2 mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาประเทศ / search country..."
            className="px-3 py-2 border rounded-lg text-sm w-64"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowOnlyFavorites((v) => !v)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            {showOnlyFavorites ? "แสดงทั้งหมด" : "เฉพาะที่บันทึก"}
          </motion.button>
        </div>

        {/* Section */}
        <motion.div key={activeSection} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {section.title_th} — {section.title_en}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visibleCountries.length === 0 && (
              <div className="p-6 border rounded-lg text-center text-sm text-gray-500">
                ไม่มีประเทศที่ตรงกับการค้นหา
              </div>
            )}

            {visibleCountries.map((country, idx) => (
              <motion.article
                key={country}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 border rounded-lg shadow-sm flex items-start gap-3 bg-white"
              >
                {/* icon รูปสี่เหลี่ยม */}
                <div className="flex-shrink-0">{getIcon(country)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{country}</h3>
                    <button onClick={() => toggleFavorite(country)} className="text-sm px-2 py-1 border rounded">
                      {favorites.has(country) ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">ข้อมูล: {country}</p>
                  <div className="mt-3 flex gap-2">
                    <Link to={`/country/${encodeURIComponent(country)}`} className="text-sm underline text-blue-600">
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.footer className="text-sm text-gray-500 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
          โปรดแจ้งหากต้องการขยายเป็นหน้าแยกสำหรับแต่ละประเทศ
        </motion.footer>
      </div>
    </div>
  );
}
