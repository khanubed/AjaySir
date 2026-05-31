import React, { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  Trash2,
  Eye,
} from "lucide-react";
import api from "../../api/axios.js"; // Adjust path if needed

export default function AdminQueries({ onSave }) {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Queries
  const fetchQueries = async () => {
    try {
      setLoading(true);

      const res = await api.get("/query");

      if (res.data.success) {
        setQueries(res.data.data);

        if (res.data.data.length > 0) {
          setSelectedQuery(res.data.data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch queries:", error);
      onSave?.("अनुरोध प्राप्त करने में त्रुटि हुई।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Toggle Status
  const toggleStatus = async (id) => {
    try {
      const res = await api.patch(`/query/${id}/status`);

      if (res.data.success) {
        const updatedQuery = res.data.data;

        setQueries((prev) =>
          prev.map((q) => (q._id === id ? updatedQuery : q))
        );

        if (selectedQuery?._id === id) {
          setSelectedQuery(updatedQuery);
        }

        onSave?.("अनुरोध की स्थिति अपडेट की गई!");
      }
    } catch (error) {
      console.error(error);
      onSave?.("स्थिति अपडेट नहीं हो सकी।");
    }
  };

  // Delete Query
  const deleteQuery = async (id) => {
    const confirmDelete = window.confirm(
      "क्या आप वाकई इस अनुरोध को हटाना चाहते हैं?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/query/${id}`);

      if (res.data.success) {
        setQueries((prev) => prev.filter((q) => q._id !== id));

        if (selectedQuery?._id === id) {
          setSelectedQuery(null);
        }

        onSave?.("अनुरोध सफलतापूर्वक हटा दिया गया।");
      }
    } catch (error) {
      console.error(error);
      onSave?.("अनुरोध हटाया नहीं जा सका।");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            पूजा एवं अनुष्ठान अनुरोध (User Queries)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            वेबसाइट के कांटेक्ट फॉर्म से आए सभी संदेशों को यहाँ प्रबंधित करें।
          </p>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg flex items-center gap-1.5">
            <Clock size={14} />
            Pending:{" "}
            {queries.filter((q) => q.status === "pending").length}
          </span>

          <span className="px-3 py-1.5 bg-green-100 text-green-800 text-xs font-semibold rounded-lg flex items-center gap-1.5">
            <CheckCircle size={14} />
            Resolved:{" "}
            {queries.filter((q) => q.status === "resolved").length}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-6 items-start">
        {/* Query Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <th className="p-4">यजमान (User)</th>
                  <th className="p-4 hidden md:table-cell">दिनांक</th>
                  <th className="p-4">स्थिति</th>
                  <th className="p-4 text-right">कार्रवाई</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-gray-500">
                      Loading Queries...
                    </td>
                  </tr>
                ) : queries.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-400 text-xs"
                    >
                      कोई नया अनुरोध नहीं मिला।
                    </td>
                  </tr>
                ) : (
                  queries.map((query) => (
                    <tr
                      key={query._id}
                      className={`hover:bg-amber-50/30 transition-colors cursor-pointer ${
                        selectedQuery?._id === query._id
                          ? "bg-amber-50/50"
                          : ""
                      }`}
                      onClick={() => setSelectedQuery(query)}
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900">
                          {query.name}
                        </div>

                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          <Phone size={12} />
                          {query.mobile}
                        </div>
                      </td>

                      <td className="p-4 hidden md:table-cell text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(
                            query.createdAt
                          ).toLocaleDateString("en-IN")}
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            query.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {query.status === "pending"
                            ? "पेंडिंग"
                            : "पूर्ण"}
                        </span>
                      </td>

                      <td
                        className="p-4 text-right space-x-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setSelectedQuery(query)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => toggleStatus(query._id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            query.status === "pending"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-amber-600 hover:bg-amber-50"
                          }`}
                          title="Toggle Status"
                        >
                          <CheckCircle size={16} />
                        </button>

                        <button
                          onClick={() => deleteQuery(query._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-4 sticky top-6">
          <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-3 text-sm tracking-wide uppercase">
            अनुरोध का विवरण
          </h3>

          {selectedQuery ? (
            <div className="space-y-4 text-xs md:text-sm">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  नाम
                </span>

                <p className="font-semibold text-gray-900 text-base">
                  {selectedQuery.name}
                </p>
              </div>

              <div className="flex gap-2 items-center text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <Phone
                  size={16}
                  className="text-amber-600 shrink-0"
                />
                <a
                  href={`tel:${selectedQuery.mobile}`}
                  className="hover:underline font-medium"
                >
                  {selectedQuery.mobile}
                </a>
              </div>

              <div className="flex gap-2 items-start text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                <MapPin
                  size={16}
                  className="text-amber-600 shrink-0 mt-0.5"
                />
                <p className="font-medium">
                  {selectedQuery.address || "N/A"}
                </p>
              </div>

              <div className="bg-amber-50/40 border border-amber-100/60 rounded-xl p-3.5">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                  पूजन आवश्यकता / संदेश:
                </span>

                <p className="text-gray-800 leading-relaxed italic">
                  "{selectedQuery.message}"
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href={`https://wa.me/${selectedQuery.mobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  WhatsApp संपर्क
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs">
              विवरण देखने के लिए सूची में से किसी भी अनुरोध पर क्लिक करें।
            </div>
          )}
        </div>
      </div>
    </div>
  );
}