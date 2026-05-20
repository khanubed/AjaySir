    import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Users, Sparkles, Star, Plus, Trash2, Save, RotateCcw, Check, MessageSquare, ListPlus } from "lucide-react";
import { getLiveReviewsData, saveLiveReviewsData } from "../../data/reviews.js";

export default function AdminReviews() {
  const [stats, setStats] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const data = getLiveReviewsData();
    setStats(data.overviewStats);
    setReviews(data.reviews);
  }, []);

  const handleStatChange = (id, field, value) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleReviewChange = (id, field, value) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addNewReview = () => {
    const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
    setReviews(prev => [
      ...prev,
      { id: newId, name: "नया भक्त", rating: 5, review: "अपना अनुभव यहाँ लिखें..." }
    ]);
  };

  const deleteReview = (id) => {
    if (window.confirm("क्या आप इस समीक्षा (Review) को हटाना चाहते हैं?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveLiveReviewsData(stats, reviews);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("क्या आप सभी बदलावों को रद्द करके पुराना सुरक्षित डेटा वापस लाना चाहते हैं?")) {
      const data = getLiveReviewsData();
      setStats(data.overviewStats);
      setReviews(data.reviews);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <Check size={18} /> समीक्षाएं और आंकड़े सुरक्षित कर दिए गए हैं!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-3xl shadow-sm gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <MessageSquare className="text-saffron" /> समीक्षा एवं सांख्यिकी प्रबंधन
            </h1>
            <p className="text-xs text-brown/60 mt-0.5">वेबसाइट के मुख्य काउंटर आंकड़े और भक्तों के रिव्यू लाइव अपडेट करें।</p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/20 hover:bg-gray-50 text-brown font-semibold py-2 px-4 rounded-xl text-xs transition"
            >
              <RotateCcw size={14} /> रीसेट
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-semibold py-2 px-5 rounded-xl text-xs shadow-md hover:bg-saffron/90 transition"
            >
              <Save size={14} /> डेटा सेव करें
            </button>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW STATS EDIT */}
        <div className="space-y-4">
          <h2 className="text-md font-bold text-saffron uppercase tracking-wider flex items-center gap-2">
            <Award size={18} /> 1. मुख्य आंकड़े (Counters)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white border border-saffron/10 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-saffron bg-saffron/10 px-2.5 py-1 rounded-md">
                    आंकड़ा #{stat.id} ({stat.icon})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[11px] font-bold text-brown/80 mb-1">संख्या / स्कोर</label>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleStatChange(stat.id, "number", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50 font-bold"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-brown/80 mb-1">शीर्षक (Title)</label>
                    <input
                      type="text"
                      value={stat.title}
                      onChange={(e) => handleStatChange(stat.id, "title", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-brown/80 mb-1">छोटा विवरण (Description)</label>
                  <textarea
                    rows={2}
                    value={stat.description}
                    onChange={(e) => handleStatChange(stat.id, "description", e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: REVIEWS MANAGEMENT */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-md font-bold text-saffron uppercase tracking-wider flex items-center gap-2">
              <ListPlus size={18} /> 2. भक्तों के अनुभव व समीक्षाएं (Reviews)
            </h2>
            <button
              type="button"
              onClick={addNewReview}
              className="flex items-center gap-1 bg-darkbrown text-cream hover:bg-black text-xs font-bold py-1.5 px-3 rounded-xl transition shadow-sm"
            >
              <Plus size={14} /> नया रिव्यू जोड़ें
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-saffron/10 rounded-2xl p-5 shadow-sm space-y-4 relative group">
                <button
                  type="button"
                  onClick={() => deleteReview(rev.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
                  title="रिव्यू हटाएं"
                >
                  <Trash2 size={16} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-brown/80 mb-1">भक्त का नाम (Name)</label>
                      <input
                        type="text"
                        value={rev.name}
                        onChange={(e) => handleReviewChange(rev.id, "name", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brown/80 mb-1">स्टार रेटिंग (1 से 5)</label>
                      <select
                        value={rev.rating}
                        onChange={(e) => handleReviewChange(rev.id, "rating", parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50 font-mono"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        <option value={2}>⭐⭐ (2 Stars)</option>
                        <option value={1}>⭐ (1 Star)</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-brown/80 mb-1">समीक्षा/अनुभव संदेश (Review Text)</label>
                    <textarea
                      rows={4}
                      value={rev.review}
                      onChange={(e) => handleReviewChange(rev.id, "review", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-saffron outline-none bg-gray-50/50 resize-none h-[calc(100%-20px)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Bottom Save Button */}
        <div className="flex justify-end pt-4 border-t border-saffron/10">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-[#4a1d00] to-darkbrown text-white font-bold py-3 px-10 rounded-2xl text-sm shadow-md hover:opacity-95 transition"
          >
            <Save size={16} /> सभी बदलाव सुरक्षित करें
          </button>
        </div>
      </div>
    </div>
  );
}