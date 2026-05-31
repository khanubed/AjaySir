import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Sparkles, Video, Image, UserCheck, 
  Mail, MessageSquare, MessageSquareText, MapPin, CreditCard, ShieldCheck 
} from "lucide-react";

// Components & Sections
import AdminLogin from "./AdminLogin";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

// All section imports
import AdminHero from "./sections/AdminHero";
import AdminServices from "./sections/AdminServices";
import AdminVideos from "./sections/AdminVideos";
import AdminGallery from "./sections/AdminGallery";
import AdminQueries from "./sections/AdminQueries";
import AdminAbout from "./sections/AdminAbout";
import AdminContact from "./sections/AdminContact.";
import AdminReviews from "./sections/AdminReviews";
import AdminLocation from "./sections/AdminLocation";
import AdminFooter from "./sections/AdminFooter";

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const triggerNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

useEffect(() => {
  // Page reload hone par localStorage check karein
  const token = localStorage.getItem("admin_session_token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (token && isAdmin) {
    setIsAuthenticated(true);
  }
  
  // Loading state ko false karein taaki UI render ho sake
  setAuthLoading(false);
}, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "panditji2026") {
      localStorage.setItem("admin_session_token", "mock_jwt_token");
      setIsAuthenticated(true);
      triggerNotification("लॉगिन सफल! स्वागत है।");
    } else {
      setAuthError("यूज़रनेम या पासवर्ड गलत है।");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_session_token");
    setIsAuthenticated(false);
  };

  const menuItems = [
    { id: "hero", label: "Hero Content", icon: LayoutDashboard, component: <AdminHero onSave={triggerNotification} /> },
    { id: "services", label: "Our Services", icon: Sparkles, component: <AdminServices onSave={triggerNotification} /> },
    { id: "videos", label: "Video Gallery", icon: Video, component: <AdminVideos onSave={triggerNotification} /> },
    { id: "gallery", label: "Photo Gallery", icon: Image, component: <AdminGallery onSave={triggerNotification} /> },
    { id: "about", label: "About Page", icon: UserCheck, component: <AdminAbout onSave={triggerNotification} /> },
    { id: "queries", label: "Requests", icon: MessageSquareText, component: <AdminQueries /> },
    { id: "contact", label: "Contact Info", icon: Mail, component: <AdminContact onSave={triggerNotification} /> },
    { id: "reviews", label: "Testimonials", icon: MessageSquare, component: <AdminReviews onSave={triggerNotification} /> },
    { id: "location", label: "Map & Office", icon: MapPin, component: <AdminLocation onSave={triggerNotification} /> },
    { id: "footer", label: "Footer Layout", icon: CreditCard, component: <AdminFooter onSave={triggerNotification} /> },
  ];

  const currentSection = menuItems.find(item => item.id === activeTab);

  if (authLoading) return <div className="min-h-screen bg-[#fffbf7] flex items-center justify-center">सिस्टम लोड हो रहा है...</div>;

  if (!isAuthenticated) {
    return <AdminLogin setAuthStatus={setIsAuthenticated}
    triggerNotification={triggerNotification}
      handleLogin={handleLogin} username={username} setUsername={setUsername}
      password={password} setPassword={setPassword} showPassword={showPassword}
      setShowPassword={setShowPassword} authError={authError}
    />;
  }

  return (
    <div className="min-h-screen bg-[#fffbf7] flex font-sans">
      <AnimatePresence>
        {successMessage && (
          <motion.div initial={{ opacity: 0, y: -20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-darkbrown text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-saffron/30"
          >
            <ShieldCheck className="text-saffron" size={20} /> {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AdminSidebar 
        menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} handleLogout={handleLogout}
      />

      <main className="flex-1 h-screen overflow-y-auto relative">
        <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-6 md:p-10 pt-24 lg:pt-10 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentSection?.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}