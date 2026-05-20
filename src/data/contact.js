// src/data/contact.js

export const contactFormFields = [
  { id: 1, label: "Full Name", placeholder: "Enter your full name", type: "text", name: "name" },
  { id: 2, label: "Mobile Number", placeholder: "Enter your mobile number", type: "tel", name: "mobile" },
  { id: 3, label: "Address", placeholder: "Enter your address", type: "text", name: "address" },
  { id: 4, label: "Message", placeholder: "Write your message or puja requirement...", type: "textarea", name: "message" },
];

const defaultContactConfig = {
  phone: "+91 9589547529",
  whatsapp: "919589547529", // बिना '+' के व्हाट्सएप लिंक के लिए बेहतर
  email: "vedicservices@gmail.com",
  location: "इन्दौर, मध्य प्रदेश, भारत",
  timing: "सोमवार से रविवार (सप्ताह के सभी दिन)"
};

// लोकल स्टोरेज से डेटा लोड या सेव करने के लिए हेल्पर फंक्शन्स
export const getContactConfig = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("pandit_contact_config");
    return saved ? JSON.parse(saved) : defaultContactConfig;
  }
  return defaultContactConfig;
};

export const saveContactConfig = (config) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pandit_contact_config", JSON.stringify(config));
  }
};

// मुख्य कंपोनेंट में इस्तेमाल के लिए एरे जनरेटर फंक्शन
export const getContactDetailsArray = (config) => [
  { id: 1, title: "फ़ोन नंबर", value: config.phone, icon: "Phone" },
  { id: 2, title: "ईमेल पता", value: config.email, icon: "Mail" },
  { id: 3, title: "स्थान (Location)", value: config.location, icon: "MapPin" },
  { id: 4, title: "उपलब्धता", value: config.timing, icon: "Clock3" },
];