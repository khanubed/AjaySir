// src/data/reviews.js

const defaultOverviewStats = [
  {
    id: 1,
    number: "5+",
    title: "वर्षों का अनुभव",
    description: "गहन आध्यात्मिक ज्ञान और वैदिक अनुष्ठानों का लंबा अनुभव।",
    icon: "Award",
  },
  {
    id: 2,
    number: "1000+",
    title: "संतुष्ट परिवार",
    description: "पूर्ण निष्ठा और पवित्र अनुष्ठानों से लाभान्वित हुए सुखी परिवार।",
    icon: "Users",
  },
  {
    id: 3,
    number: "12+",
    title: "आध्यात्मिक सेवाएं",
    description: "वैदिक अनुष्ठानों, पावन यज्ञों और पूजा सेवाओं की विस्तृत श्रृंखला।",
    icon: "Sparkles",
  },
  {
    id: 4,
    number: "4.9★",
    title: "भक्तों का विश्वास",
    description: "श्रद्धालुओं और परिवारों द्वारा सदैव सराहनीय एवं पूर्ण विश्वसनीय।",
    icon: "Star",
  },
];

const defaultReviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    review: "पंडित जी ने हमारे गृह प्रवेश की पूजा पूर्ण श्रद्धा और उचित विधि-विधान के साथ संपन्न कराई। उनका सानिध्य वास्तव में अत्यंत शांतिपूर्ण और दिव्य था।",
  },
  {
    id: 2,
    name: "Priya Verma",
    rating: 5,
    review: "पंडित जी बहुत ज्ञानी और सौम्य स्वभाव के हैं। उन्होंने नवग्रह शांति पूजा को बहुत ही सुंदर तरीके से कराया और हर एक नियम को अच्छे से समझाया।",
  },
  {
    id: 3,
    name: "Amit Tiwari",
    rating: 5,
    review: "हमने महा रुद्राभिषेक और वास्तु शांति के लिए पंडित जी से संपर्क किया था। सभी अनुष्ठान पूर्णतः प्रामाणिक थे, जिससे हमारे घर में बेहद सकारात्मक माहौल बना।",
  },
  {
    id: 4,
    name: "Sneha Mishra",
    rating: 5,
    review: "सभी प्रकार के आध्यात्मिक और वैदिक अनुष्ठानों के लिए पंडित जी का नाम अत्यधिक अनुशंसित है। समय की पाबंदी, व्यावसायिकता और एक अलौकिक अनुभव।",
  },
];

// गेट और सेव करने के लिए हेल्पर फंक्शंस
export const getLiveReviewsData = () => {
  if (typeof window !== "undefined") {
    const stats = localStorage.getItem("pandit_overview_stats");
    const revs = localStorage.getItem("pandit_user_reviews");
    return {
      overviewStats: stats ? JSON.parse(stats) : defaultOverviewStats,
      reviews: revs ? JSON.parse(revs) : defaultReviews,
    };
  }
  return { overviewStats: defaultOverviewStats, reviews: defaultReviews };
};

export const saveLiveReviewsData = (overviewStats, reviews) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pandit_overview_stats", JSON.stringify(overviewStats));
    localStorage.setItem("pandit_user_reviews", JSON.stringify(reviews));
  }
};