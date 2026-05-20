// src/data/locationData.js

const defaultLocationData = {
  topTag: "हमारा सेवा क्षेत्र (Service Location)",
  mainHeading: "समग्र इंदौर और निकटवर्ती क्षेत्रों में वैदिक सेवाएं उपलब्ध",
  description: "हम पूर्ण इंदौर, मध्य प्रदेश और इसके आसपास के क्षेत्रों में आपके घर, दुकान, प्रतिष्ठान या कार्यालय में आकर संपूर्ण विधि-विधान और शुद्धता के साथ सभी धार्मिक अनुष्ठान एवं पूजा संपन्न करते हैं।",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235527.49624536643!2d75.69460293155707!3d22.723533479093863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b4106b5%3A0x6a6ea85b88f6d384!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  cardTag: "मुख्य केंद्र",
  cardHeading: "इन्दौर, मध्य प्रदेश",
  cardDescription: "यदि आप इंदौर से बाहर किसी अन्य शहर या राज्य में बड़े महायज्ञ, श्रीमद्भागवत कथा, या विशेष अनुष्ठान का आयोजन करवाना चाहते हैं, तो कृपया समय से पूर्व बुकिंग के लिए हमसे संपर्क करें।"
};

// लोकल स्टोरेज से डेटा लोड या रीसेट करने के लिए हेल्पर फंक्शन्स
export const getLiveLocationData = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("pandit_location_data");
    return saved ? JSON.parse(saved) : defaultLocationData;
  }
  return defaultLocationData;
};

export const saveLiveLocationData = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pandit_location_data", JSON.stringify(data));
  }
};