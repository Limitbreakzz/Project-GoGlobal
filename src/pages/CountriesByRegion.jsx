// src/components/countries-compo/CountriesByRegion.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { REGIONS, useFilteredCountries } from "../components/countries-compo/CountriesData";
import { countriesData } from "../Data/countries";

export default function CountriesByRegion() {
  const region = REGIONS[0];
  const [activeSection, setActiveSection] = useState(region.sections[0].id);
  const [query, setQuery] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const ALL_COUNTRIES_ID = "all";
  const allCountries = useMemo(
    () => region.sections.flatMap((s) => s.countries),
    [region]
  );

  const filteredSection = useFilteredCountries(region, activeSection, query);

  const section =
    activeSection === ALL_COUNTRIES_ID
      ? { title_th: "ทุกประเทศ", title_en: "All Countries" }
      : filteredSection.section;

  const countries = useMemo(() => {
    if (activeSection === ALL_COUNTRIES_ID) {
      const q = query.trim().toLowerCase();
      return allCountries.filter((c) => c.toLowerCase().includes(q));
    }
    return filteredSection.countries;
  }, [activeSection, query, allCountries, filteredSection]);

  const visibleCountries = countries.filter(
    (c) => !showOnlyFavorites || favorites.has(c)
  );

  function toggleFavorite(country) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(country) ? next.delete(country) : next.add(country);
      return next;
    });
  }

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

  const sectionRefs = useRef({});
  const location = useLocation();

  // scroll ไป Section ตาม hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = sectionRefs.current[id];
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  }, [location.hash]);

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveSection(ALL_COUNTRIES_ID);
              setQuery("");
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === ALL_COUNTRIES_ID
                ? "bg-white text-gray-800"
                : "bg-[#0D0E0E] text-white hover:bg-[#100E09]"
            }`}
          >
            ทุกประเทศ · All Countries
          </motion.button>
          {region.sections.map((s) => (
            <motion.button
              key={s.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveSection(s.id);
                setQuery("");
              }}
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
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          ref={(el) => (sectionRefs.current[activeSection] = el)}
        >
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
                <div className="flex-shrink-0">{getIcon(country)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{country}</h3>
                    <motion.button
                      onClick={() => toggleFavorite(country)}
                      whileTap={{ scale: 1.3 }}
                      initial={{ scale: 1 }}
                      animate={{ scale: favorites.has(country) ? 1.2 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`text-sm px-2 py-1 border rounded ${
                        favorites.has(country)
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {favorites.has(country) ? "★" : "☆"}
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">ข้อมูล: {country}</p>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to={`/country/${encodeURIComponent(country)}`}
                      className="text-sm underline text-blue-600"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.footer
          className="text-sm text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          คลิกชื่อประเทศเพื่อดูรายละเอียดเพิ่มเติมเกี่ยวกับประเทศนั้น
        </motion.footer>
      </div>
    </div>
  );
}
