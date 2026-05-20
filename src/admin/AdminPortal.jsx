import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Sparkles, Video, Image, UserCheck, 
  Mail, MessageSquare, MapPin, CreditCard, LogOut, 
  Menu, X, ShieldCheck, Lock, Eye, EyeOff
} from "lucide-react";

// आपके सभी एडमिन सेक्शन्स के इम्पोर्ट्स
import AdminHero from "./sections/AdminHero";
import AdminServices from "./sections/AdminServices";
import AdminVideos from "./sections/AdminVideos";
import AdminGallery from "./sections/AdminGallery";
import AdminAbout from "./sections/AdminAbout";
import AdminContact from "./sections/AdminContact.";
import AdminReviews from "./sections/AdminReviews";
import AdminLocation from "./sections/AdminLocation";
import AdminFooter from "./sections/AdminFooter";

export default function AdminPortal() {
  // ऑथेंटिकेशन और यूज़र स्टेट्स
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // नेविगेशन और UI स्टेट्स
  const [activeTab, setActiveTab] = useState("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // नोटिफिकेशन ट्रिगर हेल्पर (आपके पुराने कोड की तरह)
  const triggerNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // ऐप लोड होने पर टोकन चेक करें (Frontend Session Management)
  useEffect(() => {
    const token = localStorage.getItem("admin_session_token");
    if (token) {
      // भविष्य में यहाँ टोकन को बैकएंड पर वेरीफाई करने का कोड आएगा
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  // लॉगिन हैंडलर (अभी लोकल है, बैकएंड हुक्स के लिए तैयार है)
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");

    // क्रेडेंशियल्स चेक (अभी के लिए डमी हार्डकोडेड)
    if (username === "admin" && password === "panditji2026") {
      // बैकएंड आने पर यहाँ JWT टोकन सेव होगा: localStorage.setItem("admin_session_token", res.data.token)
      localStorage.setItem("admin_session_token", "mock_jwt_token_value");
      setIsAuthenticated(true);
      triggerNotification("एडमिन पोर्टल में आपका स्वागत है!");
    } else {
      setAuthError("ग़लत यूज़रनेम या पासवर्ड! कृपया पुनः प्रयास करें।");
    }
  };

  // लॉगआउट हैंडलर
  const handleLogout = () => {
    localStorage.removeItem("admin_session_token");
    setIsAuthenticated(false);
    triggerNotification("आप सफलतापूर्वक लॉगआउट हो चुके हैं।");
  };

  // नेविगेशन मेनू आइटम्स का एरे (स्केलेबल आर्किटेक्चर)
  const menuItems = [
    { id: "hero", label: "Hero Section", icon: LayoutDashboard, component: <AdminHero onSave={triggerNotification} /> },
    { id: "services", label: "Services", icon: Sparkles, component: <AdminServices onSave={triggerNotification} /> },
    { id: "videos", label: "Videos", icon: Video, component: <AdminVideos onSave={triggerNotification} /> },
    { id: "gallery", label: "Gallery", icon: Image, component: <AdminGallery onSave={triggerNotification} /> },
    { id: "about", label: "About Us", icon: UserCheck, component: <AdminAbout onSave={triggerNotification} /> },
    { id: "contact", label: "Contact Details", icon: Mail, component: <AdminContact onSave={triggerNotification} /> },
    { id: "reviews", label: "Reviews & Testimonials", icon: MessageSquare, component: <AdminReviews onSave={triggerNotification} /> },
    { id: "location", label: "Location", icon: MapPin, component: <AdminLocation onSave={triggerNotification} /> },
    { id: "footer", label: "Footer Settings", icon: CreditCard, component: <AdminFooter onSave={triggerNotification} /> },
  ];

  // एक्टिव कंपोनेंट को ढूंढना
  const currentSection = menuItems.find((item) => item.id === activeTab);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#fffaf5] flex items-center justify-center text-[#4a1d00] font-semibold">
        पोर्टल लोड हो रहा है...
      </div>
    );
  }

  // --- 1. अगर यूज़र लॉग इन नहीं है तो ऑथेंटिकेशन स्क्रीन दिखाएं ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#240a00] via-[#1b0700] to-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/10 w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* सजावटी दिव्य आभा पृष्ठभूमि */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl mx-auto flex items-center justify-center mb-4 text-amber-400 text-2xl font-bold">
              ॐ
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
              <ShieldCheck className="text-amber-500" size={22} /> पंडित जी एडमिन पोर्टल
            </h2>
            <p className="text-gray-400 text-xs mt-1">वेबसाइट का डेटा सुरक्षित रूप से प्रबंधित करने के लिए लॉगिन करें</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-medium">
                {authError}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">यूज़रनेम (Username)</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">पासवर्ड (Password)</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-11 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 rounded-xl text-sm shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 flex items-center justify-center gap-2 mt-2"
            >
              <Lock size={16} /> पोर्टल में प्रवेश करें
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- 2. लॉग इन होने के बाद मुख्य डैशबोर्ड लेआउट दिखाएं ---
  return (
    <div className="min-h-screen bg-[#fffbf7] flex">
      
      {/* ग्लोबल नोटिफिकेशन अलर्ट टोस्ट */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <ShieldCheck size={18} /> {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* मोबाइल हैडर (सिर्फ छोटी स्क्रीन पर दिखेगा) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <span className="text-xl text-amber-600">ॐ</span>
          <h1 className="font-bold text-gray-800 text-sm">पंडित जी एडमिन</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-xl"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* साइडबार कंपोनेंट (डेस्कटॉप पर परमानेंट फिक्स्ड, मोबाइल पर ड्रॉअर) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#240a00] to-black text-white p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div>
          {/* साइडबार लोगो */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-5 mb-5 pt-4 lg:pt-0">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-xl text-amber-400 font-bold">
              ॐ
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide">पंडित जी</h2>
              <p className="text-[10px] text-amber-400 tracking-wider uppercase font-semibold">नियंत्रण कक्ष</p>
            </div>
          </div>

          {/* नेविगेशन लिंक्स / पेजिनेशन अल्टरनेटिव */}
          <nav className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)] pr-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false); // मोबाइल व्यू क्लीन करने के लिए क्लोज करें
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-amber-600 text-white shadow-md shadow-amber-900/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <IconComponent size={16} className={isActive ? "text-white" : "text-gray-400"} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* साइडबार बॉटम एक्शन (लॉगआउट) */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={16} /> लॉगआउट (Sign Out)
          </button>
        </div>
      </aside>

      {/* मोबाइल मेनू ओपन होने पर ब्लैक मास्क ओवरले */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* मुख्य कंटेंट वर्किंग एरिया */}
      <main className="flex-1 h-screen pt-16 lg:pt-0 overflow-y-scroll  ">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentSection ? currentSection.component : <div className="text-center text-sm p-10">त्रुटि: अनुभाग नहीं मिला।</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
} 