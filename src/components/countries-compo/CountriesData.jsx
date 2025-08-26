// src/components/countries-compo/CountriesData.jsx
import { useMemo } from "react";

export const REGIONS = [
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

export function useFilteredCountries(regionData, activeSectionId, query) {
  return useMemo(() => {
    const section = regionData.sections.find((s) => s.id === activeSectionId) || regionData.sections[0];
    const q = query.trim().toLowerCase();
    const countries = section.countries.filter((c) => c.toLowerCase().includes(q));
    return { section, countries };
  }, [regionData, activeSectionId, query]);
}
