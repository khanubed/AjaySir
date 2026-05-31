import React from "react";
import { LogOut, X } from "lucide-react";

export default function AdminSidebar({ 
  menuItems, activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, handleLogout 
}) {
  return (
    <>
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#240a00] to-black text-white p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-xl text-amber-400 font-bold">ॐ</div>
              <div>
                <h2 className="font-bold text-sm">पंडित जी</h2>
                <p className="text-[9px] text-amber-500 font-black uppercase tracking-tighter">Admin Control</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400"><X size={20}/></button>
          </div>

          <nav className="space-y-1 overflow-y-auto max-h-[70vh] custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                    isActive ? "bg-amber-600 text-white shadow-lg" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} /> {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all border-t border-white/5"
        >
          <LogOut size={18} /> सिस्टम से बाहर निकलें
        </button>
      </aside>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />
      )}
    </>
  );
}