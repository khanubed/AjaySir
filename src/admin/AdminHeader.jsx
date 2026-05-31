import React from "react";
import { Menu } from "lucide-react";

export default function AdminHeader({ setIsSidebarOpen }) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-30 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl text-amber-600 font-bold">ॐ</span>
        <h1 className="font-bold text-gray-800 text-sm">Pandit Ji Admin</h1>
      </div>
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 bg-gray-50 rounded-lg text-gray-600"
      >
        <Menu size={22} />
      </button>
    </div>
  );
}