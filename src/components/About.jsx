import React, { useState } from 'react'
import { motion } from 'framer-motion' // ✅ เพิ่ม framer-motion

const tabs = [
  { id: 'history', label: 'ประวัติ' },
  { id: 'attractions', label: 'สถานที่ท่องเที่ยว' },
  { id: 'culture', label: 'วัฒนธรรม' },
  { id: 'gallery', label: 'แกลเลอรี่' }
]

const tabContent = {
  history: {
    title: 'ประวัติอันยาวนาน',
    description:
      'เส้นทางประวัติศาสตร์ของสถานที่ท่องเที่ยวในประเทศไทยมีความหลากหลายและมีเรื่องราวที่น่าสนใจมากมาย ตั้งแต่ยุคความเจริญรุ่งเรืองอย่างสุโขทัย อยุธยา จนถึงรัตนโกสินทร์ แต่ละพื้นที่มีเอกลักษณ์และวัฒนธรรมที่แตกต่างกันไป ทำให้นักท่องเที่ยวได้สัมผัสมนต์เสน่ห์ของประวัติศาสตร์ไทยในแต่ละภูมิภาค',
    facts: [
      'ก่อตั้งเมื่อกว่า 700 ปีที่ผ่านมา',
      'ได้รับการขึ้นทะเบียนเป็นมรดกโลกในปี พ.ศ. 2534',
      'เป็นแหล่งรวมศิลาจารึกและวัฒนธรรมแห่งภูมิภาค'
    ]
  },
  attractions: {
    title: 'สถานที่ท่องเที่ยวเด่น',
    description:
      'สถานที่ท่องเที่ยวในไทยมีความหลากหลาย ทั้งธรรมชาติ วัดวาอาราม และแหล่งท่องเที่ยวทางวัฒนธรรมที่มีชื่อเสียงระดับโลก',
    facts: [
      'เกาะพีพี กระบี่',
      'วัดพระแก้ว กรุงเทพฯ',
      'อุทยานแห่งชาติหมู่เกาะสิมิลัน'
    ]
  },
  culture: {
    title: 'วัฒนธรรมและประเพณี',
    description:
      'สัมผัสวัฒนธรรมที่หลากหลายและประเพณีที่เป็นเอกลักษณ์ของแต่ละภูมิภาคในประเทศไทย',
    facts: ['สงกรานต์', 'ลอยกระทง', 'งานบุญบั้งไฟ']
  },
  gallery: {
    title: 'แกลเลอรี่',
    description: 'ชมภาพบรรยากาศและสถานที่ท่องเที่ยวที่น่าประทับใจจากทั่วประเทศไทย'
  }
}

const images = [
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    location: 'เกาะพีพี, กระบี่',
    caption: 'เกาะสวรรค์แดนใต้'
  },
  {
    url: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=80',
    location: 'วัดพระแก้ว, กรุงเทพฯ',
    caption: 'วัดสำคัญในกรุงเทพฯ'
  },
  {
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
    location: 'อุทยานแห่งชาติหมู่เกาะสิมิลัน',
    caption: 'ทะเลสวย น้ำใส'
  },
  {
    url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    location: 'เชียงใหม่',
    caption: 'วัฒนธรรมล้านนา'
  }
]

const About = () => {
  const [activeTab, setActiveTab] = useState('history')
  const [activeImg, setActiveImg] = useState(0)

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
          <h1 className="text-4xl font-bold text-gray-800">เกี่ยวกับเรา</h1>
        </motion.div>

        <motion.p
          className="text-gray-800 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ค้นพบความงดงามและเสน่ห์ของสถานที่ท่องเที่ยวในประเทศไทย ที่เต็มไปด้วยประวัติศาสตร์ วัฒนธรรม และธรรมชาติอันน่าทึ่ง
        </motion.p>

        {/* Tabs */}
        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-800'
                  : 'bg-[#0D0E0E] text-white hover:bg-[#100E09]'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {tabContent[activeTab].title}
            </h2>
            <p className="text-gray-800 mb-6">{tabContent[activeTab].description}</p>
            {activeTab !== 'gallery' && (
              <ul className="mb-8 list-disc list-inside text-gray-800 space-y-2">
                {tabContent[activeTab].facts.map((fact, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 }}
                  >
                    {fact}
                  </motion.li>
                ))}
              </ul>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-[#0D0E0E] text-white rounded-lg font-medium hover:bg-[#100E09] transition-all"
            >
              {activeTab === 'history'
                ? 'ดูประวัติเพิ่มเติม'
                : activeTab === 'attractions'
                ? 'ค้นหาสถานที่'
                : activeTab === 'culture'
                ? 'สัมผัสวัฒนธรรม'
                : 'ดูภาพทั้งหมด'}
            </motion.button>
          </motion.div>

          {/* Right */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-64 rounded-xl overflow-hidden mb-4"
            >
              <img
                src={images[activeImg].url}
                alt={images[activeImg].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <p className="text-gray-200 text-sm">{images[activeImg].location}</p>
                <p className="text-white font-semibold text-lg">{images[activeImg].caption}</p>
              </div>
            </motion.div>

            {/* Slider Dots */}
            <div className="flex gap-3 mt-2">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  className={`w-8 h-2 rounded-full transition-all ${
                    idx === activeImg ? 'bg-white' : 'bg-[#0D0E0E]'
                  }`}
                  onClick={() => setActiveImg(idx)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Location Indicator */}
        <motion.div
          className="mt-10 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          ขณะนี้คุณกำลังดู{' '}
          <span className="font-semibold text-[#0D0E0E]">
            {images[activeImg].location}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default About
