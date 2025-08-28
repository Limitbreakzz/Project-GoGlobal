import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm text-gray-800">
        
        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/img/icon.png" alt="GoGlobal Logo" className="w-28 mb-3" />
          <h2 className="text-2xl font-bold">GoGlobal</h2>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="font-semibold">เมนู</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-blue-600">หน้าหลัก</Link></li>
            <li><Link to="/description" className="hover:text-blue-600">แนะนำประเทศ</Link></li>
            <li><Link to="/about" className="hover:text-blue-600">เกี่ยวกับ</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">ติดต่อ</Link></li>
          </ul>
        </div>

        {/* Asia Section */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h3 className="font-semibold">เอเชีย</h3>
          <ul className="space-y-1">
            <li><Link to="/countries#all" className="hover:text-blue-600">ทุกประเทศ</Link></li>
            <li><Link to="/countries#eastasia" className="hover:text-blue-600">เอเชียตะวันออก</Link></li>
            <li><Link to="/countries#sea" className="hover:text-blue-600">เอเชียตะวันออกเฉียงใต้</Link></li>
            <li><Link to="/countries#southasia" className="hover:text-blue-600">เอเชียใต้</Link></li>
            <li><Link to="/countries#centralasia" className="hover:text-blue-600">เอเชียกลาง</Link></li>
            <li><Link to="/countries#westasia" className="hover:text-blue-600">ตะวันออกกลาง / เอเชียตะวันตก</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start space-y-2 md:col-span-3 mt-6">
          <h3 className="font-semibold">ติดต่อ</h3>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>GoGlobal@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>099-2346789</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
