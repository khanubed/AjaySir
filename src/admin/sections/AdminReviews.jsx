import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { 
  Award, Plus, Trash2, Save, RotateCcw, MessageSquare, ListPlus, Loader2 
} from "lucide-react";

// Use the custom api instance for central baseURL and Auth headers
import api from "../../api/axios.js";
// Fallback data loading
import { getLiveReviewsData } from "../../data/reviews.js";

export default function AdminReviews() {
  const [stats, setStats] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isSyncing, setIsSyncing] = useState(true);

  // --- 1. Fetch Stats & Reviews from Backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/content/reviews");
        if (res.data?.data?.values) {
          setStats(res.data.data.values.overviewStats || []);
          setReviews(res.data.data.values.reviews || []);
        } else {
          const localData = getLiveReviewsData();
          setStats(localData.overviewStats || []);
          setReviews(localData.reviews || []);
        }
      } catch (err) {
        console.warn("Backend fetch failed, using local fallback.");
        const localData = getLiveReviewsData();
        setStats(localData.overviewStats || []);
        setReviews(localData.reviews || []);
      } finally {
        setIsSyncing(false);
      }
    };
    fetchData();
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
      { id: newId, name: "New Reviewer", rating: 5, review: "Write user feedback here..." }
    ]);
  };

  const executeDelete = (id) => {
    setReviews(prevReviews => prevReviews.filter(r => r.id !== id));
    toast.success("Review removed from list (remember to save changes)");
  };

  const deleteReview = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Are you sure you want to remove this review?</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)} 
            className="text-xs text-gray-500 hover:text-darkbrown px-2 py-1"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss(t.id);
              executeDelete(id);
            }} 
            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  // --- 2. Save Both Stats & Reviews to Backend ---
  const handleSave = async () => {
    const payload = {
      overviewStats: stats,
      reviews: reviews
    };

    const savePromise = api.put("/content/reviews", payload);

    toast.promise(savePromise, {
      loading: 'Updating review records...',
      success: <b>Changes saved successfully!</b>,
      error: <b>Failed to save updates. Please try again.</b>,
    });
  };

  const handleReset = async () => {
    setIsSyncing(true);
    try {
      const res = await api.get("/content/reviews");
      if (res.data?.data?.values) {
        setStats(res.data.data.values.overviewStats || []);
        setReviews(res.data.data.values.reviews || []);
        toast.success("Restored last published state");
      }
    } catch (err) {
      toast.error("Failed to restore data");
    } finally {
      setIsSyncing(false);
    }
  };

  if (isSyncing) return (
    <div className="flex items-center justify-center min-h-screen text-saffron bg-[#fffaf3]">
      <Loader2 className="animate-spin mr-2" /> Syncing data...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fffaf3] p-4 md:p-8 text-darkbrown font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-saffron/20 p-6 rounded-[2rem] shadow-sm gap-4 sticky top-4 z-40 backdrop-blur-md bg-white/90">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-darkbrown flex items-center gap-2">
              <MessageSquare className="text-saffron" /> समीक्षा एवं सांख्यिकी
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-brown/50 font-bold mt-1">Reviews & Stats Manager</p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-brown/10 hover:bg-gray-50 text-brown font-bold py-2.5 px-5 rounded-xl text-xs transition active:scale-95"
            >
              <RotateCcw size={14} /> रिफ्रेश
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-saffron text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg shadow-saffron/20 hover:bg-saffron/90 transition active:scale-95"
            >
              <Save size={14} /> डेटा सेव करें
            </button>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW STATS */}
        <div className="space-y-4">
          <h2 className="text-xs font-black text-saffron uppercase tracking-[2px] flex items-center gap-2 ml-2">
            <Award size={18} /> 1. मुख्य आंकड़े (Counters)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white border border-saffron/10 rounded-3xl p-6 shadow-sm space-y-4 group hover:border-saffron/30 transition-colors">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <span className="text-[10px] font-black text-saffron bg-saffron/5 px-3 py-1 rounded-full uppercase">
                    ID: {stat.id} | Icon: {stat.icon}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">संख्या</label>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => handleStatChange(stat.id, "number", e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 font-bold"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">शीर्षक</label>
                    <input
                      type="text"
                      value={stat.title}
                      onChange={(e) => handleStatChange(stat.id, "title", e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 font-semibold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">छोटा विवरण</label>
                  <textarea
                    rows={2}
                    value={stat.description}
                    onChange={(e) => handleStatChange(stat.id, "description", e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: REVIEWS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xs font-black text-saffron uppercase tracking-[2px] flex items-center gap-2">
              <ListPlus size={18} /> 2. भक्तों के अनुभव (Reviews)
            </h2>
            <button
              onClick={addNewReview}
              className="flex items-center gap-2 bg-darkbrown text-cream hover:bg-black text-[10px] font-black py-2 px-4 rounded-xl transition shadow-lg active:scale-95 uppercase tracking-wider"
            >
              <Plus size={14} /> नया रिव्यू
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Added AnimatePresence to animate item layout changes elegantly */}
            <AnimatePresence initial={false}>
              {reviews.map((rev) => (
                <motion.div 
                  key={rev.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-saffron/10 rounded-[2rem] p-6 shadow-sm space-y-4 relative group hover:shadow-md transition-all"
                >
                  <button
                    onClick={() => deleteReview(rev.id)}
                    className="absolute top-6 right-6 text-gray-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">भक्त का नाम</label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => handleReviewChange(rev.id, "name", e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">रेटिंग</label>
                        <select
                          value={rev.rating}
                          onChange={(e) => handleReviewChange(rev.id, "rating", parseInt(e.target.value))}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 font-bold"
                        >
                          {[5,4,3,2,1].map(num => (
                            <option key={num} value={num}>{num} Stars</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-brown/40 mb-1 uppercase ml-1">अनुभव संदेश</label>
                      <textarea
                        rows={4}
                        value={rev.review}
                        onChange={(e) => handleReviewChange(rev.id, "review", e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 text-sm focus:border-saffron outline-none bg-gray-50/50 resize-none h-32 leading-relaxed"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Final Save */}
        <div className="flex justify-center md:justify-end pb-20">
          <button
            onClick={handleSave}
            className="group flex items-center gap-3 bg-darkbrown text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
          >
            <Save size={18} /> डेटाबेस में सुरक्षित करें
          </button>
        </div>
      </div>
    </div>
  );
}