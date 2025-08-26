import React from "react";
import { useParams, Link } from "react-router-dom";
import { countriesData } from "../../Data/countries";

export default function CountryDetail() {
  const { countryName } = useParams();
  const decodedName = decodeURIComponent(countryName);

  const countryInfo = countriesData.find(
    (c) => c.name.toLowerCase() === decodedName.toLowerCase()
  );

  if (!countryInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">ไม่พบข้อมูลประเทศ {decodedName}</h2>
        <Link to="/countries" className="mt-4 text-blue-600 underline">
          กลับไปหน้าประเทศ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center pt-24 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-8xl mb-4">{countryInfo.flag}</div>
        <h1 className="text-4xl font-extrabold text-gray-800">{countryInfo.name}</h1>
        <p className="text-gray-600 mt-2 text-lg">{countryInfo.region}</p>
      </div>

      {/* Container ข้อมูล + Map + รูป */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        {/* ซ้าย: ข้อมูล + Map */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Capital</span>
            <span>{countryInfo.capital}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Population</span>
            <span>{countryInfo.population}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">Currency</span>
            <span>{countryInfo.currency}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="font-semibold text-gray-700">Language</span>
            <span>{countryInfo.language}</span>
          </div>

          {/* Major Cities + Attractions + Map */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Major Cities</h3>
              <ul className="list-disc list-inside">
                {countryInfo.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Attractions</h3>
              <ul className="list-disc list-inside">
                {countryInfo.attractions.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Map</h3>
              <div dangerouslySetInnerHTML={{ __html: countryInfo.mapEmbed }} />
            </div>
          </div>

          {/* ปุ่มกลับ */}
          <Link
            to="/countries"
            className="mt-6 inline-block w-full bg-[#0D0E0E] hover:bg-gray-800 text-white font-medium py-3 rounded-xl text-center transition-all"
          >
            กลับไปหน้าประเทศ
          </Link>
        </div>

        {/* ขวา: รูปประเทศ */}
        <div className="flex-1 flex justify-center items-start">
          <img
            src={countryInfo.image}
            alt={countryInfo.name}
            className="rounded-2xl w-full max-w-md object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
}