    import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Flame,
  Users,
  Orbit,
  Baby,
  BookOpen,
  FlameKindling,
  Home,
  Stars,
  HeartPulse,
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  Eye
} from "lucide-react";
import { services as initialServices } from "../../data/services.js";

// Master icon map matching your existing service layout
const iconMap = {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Flame,
  Users,
  Orbit,
  Baby,
  BookOpen,
  FlameKindling,
  Home,
  Stars,
  HeartPulse,
};

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    titleHindi: "",
    titleEnglish: "",
    description: "",
    icon: "Sparkles",
    imageUrl: "",
  });

  // Handle open modal for creating a new service
  const handleCreateOpen = () => {
    setEditingService(null);
    setFormData({
      titleHindi: "",
      titleEnglish: "",
      description: "",
      icon: "Sparkles",
      imageUrl: "",
    });
    setIsModalOpen(true);
  };

  // Handle open modal for editing an existing service
  const handleEditOpen = (service) => {
    setEditingService(service);
    setFormData({
      titleHindi: service.titleHindi,
      titleEnglish: service.titleEnglish,
      description: service.description,
      icon: service.icon,
      imageUrl: service.imageUrl,
    });
    setIsModalOpen(true);
  };

  // Handle delete service
  const handleDelete = (id) => {
    if (window.confirm("क्या आप वाकई इस सेवा को हटाना चाहते हैं?")) {
      setServices(services.filter((item) => item.id !== id));
    }
  };

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingService) {
      // Update existing item
      setServices(
        services.map((item) =>
          item.id === editingService.id ? { ...item, ...formData } : item
        )
      );
    } else {
      // Create new item with a unique ID
      const newService = {
        id: services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1,
        ...formData,
      };
      setServices([...services, newService]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-6 text-darkbrown font-sans">
      {/* Header Management Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-b border-saffron/20 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-darkbrown amaranth-bold">
            डैशबोर्ड: सेवाएं प्रबंधन (Services Management)
          </h1>
          <p className="text-sm text-brown/70 mt-1">
            यहाँ से आप मुख्य वेबसाइट की सेवाओं को जोड़, बदल या हटा सकते हैं।
          </p>
        </div>
        <button
          onClick={handleCreateOpen}
          className="flex items-center gap-2 bg-saffron text-white font-medium py-3 px-6 rounded-xl shadow-md hover:bg-saffron/90 transition-all duration-200 transform active:scale-95"
        >
          <Plus size={18} /> नई सेवा जोड़ें
        </button>
      </div>

      {/* Grid List of Editable Services */}
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl border border-saffron/10 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Preview Banner */}
                  <div className="relative h-40 bg-gray-100">
                    <img
                      src={service.imageUrl || "https://images.unsplash.com/photo-1609137144813-7d9921239bf0"}
                      alt={service.titleEnglish}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-bold text-saffron">
                      ID: #{service.id}
                    </div>
                    <div className="absolute top-3 right-3 bg-saffron p-2 rounded-full text-white shadow-md">
                      {Icon ? <Icon size={18} /> : <Sparkles size={18} />}
                    </div>
                  </div>

                  {/* Service Text Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-darkbrown mb-0.5">
                      {service.titleHindi}
                    </h3>
                    <p className="text-xs font-semibold text-saffron uppercase tracking-wider mb-2">
                      {service.titleEnglish}
                    </p>
                    <p className="text-sm text-brown/80 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Management Action Buttons */}
                <div className="px-5 pb-5 pt-2 flex items-center gap-3 border-t border-gray-50 bg-gray-50/50">
                  <button
                    onClick={() => handleEditOpen(service)}
                    className="flex-1 flex items-center justify-center gap-2 border border-saffron text-saffron hover:bg-saffron hover:text-white transition-all py-2 px-3 rounded-xl text-sm font-medium"
                  >
                    <Edit3 size={15} /> संपादन (Edit)
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all p-2 rounded-xl"
                    title="हटाएं"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* CRUD Action Overlay Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-saffron/20"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-darkbrown">
                  {editingService ? "सेवा विवरण संपादित करें" : "नई पूजा सेवा जोड़ें"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-brown">
                      शीर्षक (Hindi) *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron bg-gray-50/50"
                      placeholder="जैसे: महालक्ष्मी महायज्ञ"
                      value={formData.titleHindi}
                      onChange={(e) => setFormData({ ...formData, titleHindi: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1 text-brown">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron bg-gray-50/50"
                      placeholder="e.g. Maha Lakshmi Yagya"
                      value={formData.titleEnglish}
                      onChange={(e) => setFormData({ ...formData, titleEnglish: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-brown">
                    विवरण (Description) *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron bg-gray-50/50 resize-none"
                    placeholder="इस पूजा अनुष्ठान के महत्व और विधि के बारे में लिखें..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-brown">
                    इमेज URL (Image Link) *
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-saffron bg-gray-50/50 text-xs"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
                </div>

                {/* Grid Icon Picker */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-brown">
                    सिंबल / आइकॉन चुनें (Select Icon)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {Object.keys(iconMap).map((iconName) => {
                      const CurrentIcon = iconMap[iconName];
                      const isSelected = formData.icon === iconName;
                      return (
                        <button
                          type="button"
                          key={iconName}
                          onClick={() => setFormData({ ...formData, icon: iconName })}
                          className={`p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                            isSelected
                              ? "bg-saffron text-white shadow-md scale-105"
                              : "bg-white border border-gray-200 text-brown hover:border-saffron/50"
                          }`}
                        >
                          <CurrentIcon size={20} />
                          <span className="text-[10px] block opacity-80 truncate max-w-full">
                            {iconName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Actions Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 text-sm font-medium"
                  >
                    रद्द करें (Cancel)
                  </button>
                  <button
                    type="submit"
                    className="bg-saffron text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-saffron/90 flex items-center gap-2 shadow-md"
                  >
                    <Check size={16} /> सहेजें (Save Changes)
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminServices;