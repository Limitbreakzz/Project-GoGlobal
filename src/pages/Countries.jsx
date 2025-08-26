import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const REGIONS = [
  {
    id: "asia",
    title_en: "Asia",
    title_th: "เอเชีย",
    sections: [
      {
        id: "eastasia",
        title_en: "East Asia",
        title_th: "เอเชียตะวันออก",
        countries: ["China", "Japan", "South Korea", "North Korea", "Mongolia", "Taiwan"],
      },
      {
        id: "sea",
        title_en: "Southeast Asia",
        title_th: "เอเชียตะวันออกเฉียงใต้",
        countries: [
          "Thailand", "Cambodia", "Laos", "Myanmar", "Vietnam", "Malaysia",
          "Singapore", "Brunei", "Indonesia", "Philippines", "Timor-Leste",
        ],
      },
      {
        id: "southasia",
        title_en: "South Asia",
        title_th: "เอเชียใต้",
        countries: ["India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Sri Lanka", "Maldives", "Afghanistan"],
      },
      {
        id: "centralasia",
        title_en: "Central Asia",
        title_th: "เอเชียกลาง",
        countries: ["Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan"],
      },
      {
        id: "westasia",
        title_en: "Middle East / West Asia",
        title_th: "ตะวันออกกลาง/เอเชียตะวันตก",
        countries: [
          "Saudi Arabia", "United Arab Emirates", "Qatar", "Bahrain", "Kuwait", "Oman",
          "Yemen", "Jordan", "Iraq", "Syria", "Lebanon", "Israel", "Palestine",
          "Turkey", "Iran", "Azerbaijan", "Armenia", "Georgia",
        ],
      },
    ],
  },
];

function useFilteredCountries(regionData, activeSectionId, query) {
  return useMemo(() => {
    const section =
      regionData.sections.find((s) => s.id === activeSectionId) || regionData.sections[0];
    const q = query.trim().toLowerCase();
    const countries = section.countries.filter((c) =>
      c.toLowerCase().includes(q)
    );
    return { section, countries };
  }, [regionData, activeSectionId, query]);
}

export default function CountriesByRegion() {
  const region = REGIONS[0];
  const [activeSection, setActiveSection] = useState(region.sections[0].id);
  const [query, setQuery] = useState("");
  const { section, countries } = useFilteredCountries(region, activeSection, query);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  function toggleFavorite(country) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(country)) next.delete(country);
      else next.add(country);
      return next;
    });
  }

  function copySectionList() {
    const text =
      `${section.title_en} — ${section.title_th}\n` +
      section.countries.join("\n");
    navigator.clipboard.writeText(text).then(() => {
      alert("Country list copied to clipboard");
    });
  }

  function downloadCSV() {
    const rows = [["Country"], ...section.countries.map((c) => [c])];
    const csv = rows
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${section.id}-countries.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const visibleCountries = countries.filter(
    (c) => !showOnlyFavorites || favorites.has(c)
  );

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

        <motion.p
          className="text-gray-700 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          เลือกภาค/Region เพื่อดูรายชื่อประเทศ พร้อมระบบค้นหาและบันทึกที่คุณสนใจ
        </motion.p>

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copySectionList}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Copy list
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadCSV}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            Download CSV
          </motion.button>
        </div>

        {/* Section */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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
                <div className="flex-shrink-0 text-3xl leading-none">🌏</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{country}</h3>
                    <button
                      onClick={() => toggleFavorite(country)}
                      className="text-sm px-2 py-1 border rounded"
                    >
                      {favorites.has(country) ? "★" : "☆"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    ข้อมูล: {country} (สามารถเพิ่มข้อมูลเพิ่มเติม เช่น เมืองสำคัญ ธง สกุลเงิน)
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a
                      className="text-sm underline"
                      href={`#${section.id}-${country.replace(/\s+/g, "-")}`}
                    >
                      ไปที่หน้า
                    </a>
                    <button
                      onClick={() =>
                        alert(`เปิดหน้ารายละเอียดของ ${country}`)
                      }
                      className="text-sm border px-2 py-1 rounded"
                    >
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="text-sm text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          โปรดแจ้งหากต้องการขยายเป็นหน้าแยกสำหรับแต่ละประเทศ (รายละเอียด รูปภาพ แผนที่ หรือข้อมูลท่องเที่ยว)
        </motion.footer>
      </div>
    </div>
  );
}
