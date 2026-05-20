// src/data/footer.js

const defaultFooterData = {
  slogan: "वैदिक परंपराओं के माध्यम से आपके जीवन में सुख, शांति, सकारात्मकता और दिव्य आशीर्वाद का संचार।",
  quote: "“विश्वास, सच्ची भक्ति और पवित्र अनुष्ठान जीवन को सकारात्मक ऊर्जा और दैवीय कृपा से आलोकित करते हैं।”",
  footerBottomText: "© 2026 पंडित जी वैदिक सेवाएं। सर्वाधिकार सुरक्षित।",
  socialLinks: [
    { name: "Instagram", link: "https://instagram.com", icon: "faInstagram" },
    { name: "Facebook", link: "https://facebook.com", icon: "faFacebook" },
    { name: "WhatsApp", link: "https://wa.me/919876543210", icon: "faMessage" },
    { name: "YouTube", link: "https://youtube.com", icon: "faYoutube" },
  ]
};

// ये स्टैटिक लिंक्स और सर्विसेज हैं (इन्हें आप चाहें तो ऐसे ही रख सकते हैं)
export const footerLinks = [
  { title: "Home", path: "#home" },
  { title: "Services", path: "#services" },
  { title: "Gallery", path: "#gallery" },
  { title: "About Us", path: "#about" },
  { title: "Contact", path: "#contact" },
  { title: "Location", path: "#location" },
];

export const footerServices = [
  "महा रुद्राभिषेक",
  "नवग्रह शांति पूजा",
  "वास्तु शांति अनुष्ठान",
  "श्री दुर्गा सप्तशती पाठ",
  "कालसर्प दोष निवारण",
];

// लोकल स्टोरेज हेल्पर फंक्शन्स (डायनेमिक डेटा के लिए)
export const getLiveFooterData = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("pandit_footer_data");
    return saved ? JSON.parse(saved) : defaultFooterData;
  }
  return defaultFooterData;
};

export const saveLiveFooterData = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pandit_footer_data", JSON.stringify(data));
  }
};  