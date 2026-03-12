const express = require("express");
const router = express.Router();

const FAQ_INDEX = [
  {
    keywords: ["refund", "cancel", "cancellation", "money back", "full refund", "paise wapas", "paisa wapas", "return money", "cancel policy"],
    answer: `💰 <strong>MusafirKhana Refund Policy:</strong><br><br>• <strong>7+ days before check-in</strong> → Full 100% refund ✅<br>• <strong>3–6 days before check-in</strong> → 50% refund 💸<br>• <strong>Less than 3 days</strong> → No refund ❌<br>• <strong>Emergency cancellations</strong> → Reviewed case-by-case<br><br>📧 For emergencies: support@musafirkhana.com<br>⏱️ Refunds processed within 5–7 business days.`
  },
  {
    keywords: ["how to cancel", "cancel booking", "cancel my booking", "cancel kaise", "booking cancel"],
    answer: `🔴 <strong>To Cancel Your Booking:</strong><br><br>1. Log in to your MusafirKhana account<br>2. Go to <strong>My Bookings → Dashboard</strong><br>3. Click the booking you want to cancel<br>4. Click <strong>"Cancel Booking"</strong> and confirm<br><br>📌 Refund depends on how early you cancel.<br>📧 Issues? Contact support@musafirkhana.com`
  },
  {
    keywords: ["refund time", "when refund", "refund kab", "money kab", "refund kitne din", "how long refund"],
    answer: `⏳ <strong>Refund Timeline:</strong><br><br>• <strong>UPI / Net Banking</strong> → 3–5 business days<br>• <strong>Credit / Debit Card</strong> → 5–7 business days<br>• <strong>Wallet</strong> → 1–2 business days<br><br>If you haven't received your refund after 7 days, email support@musafirkhana.com with your booking ID. 📧`
  },
  {
    keywords: ["how to book", "kaise book", "reserve", "reservation", "book karo", "make booking", "book a stay", "book karna"],
    answer: `📋 <strong>How to Book on MusafirKhana:</strong><br><br>1. Browse listings on the home page<br>2. Click on a property you like<br>3. Select <strong>Check-in</strong> and <strong>Check-out</strong> dates<br>4. Click <strong>"Book Now"</strong><br>5. Complete payment (Cards, UPI, Net Banking)<br>6. ✅ Confirmation email sent within <strong>10 minutes</strong><br><br>💡 Tip: Book early for best prices!`
  },
  {
    keywords: ["modify", "change booking", "edit booking", "change dates", "reschedule", "date change"],
    answer: `✏️ <strong>Modifying Your Booking:</strong><br><br>• Modifications allowed <strong>up to 48 hours</strong> before check-in<br>• Changes subject to availability<br>• Price difference may apply for date changes<br><br>Login → My Bookings → Select booking → Click "Modify"<br><br>📧 Urgent changes: support@musafirkhana.com`
  },
  {
    keywords: ["confirmation", "booking confirmed", "confirmation email", "email nahi aaya", "confirmation nahi"],
    answer: `📧 <strong>Booking Confirmation Help:</strong><br><br>• Confirmation sent within <strong>10 minutes</strong> of booking<br>• Check your <strong>Spam / Junk</strong> folder first<br><br><strong>Still not received?</strong><br>Login → My Bookings → Click "Resend Confirmation"<br><br>📧 Contact: support@musafirkhana.com with your phone number`
  },
  {
    keywords: ["payment", "upi", "card", "net banking", "paytm", "gpay", "how to pay", "payment options", "payment fail", "payment failed"],
    answer: `💳 <strong>Accepted Payment Methods:</strong><br><br>• Credit Cards (Visa, Mastercard, Amex) 💳<br>• Debit Cards 🏧<br>• UPI (GPay, PhonePe, Paytm, BHIM) 📱<br>• Net Banking (all major banks) 🏦<br>• Wallets (Paytm, Mobikwik)<br><br>🔒 All payments are <strong>100% secure</strong> and encrypted.<br><br><strong>Payment Failed?</strong> Try a different method or contact your bank.`
  },
  {
    keywords: ["check in", "checkin", "check-in time", "arrival time", "kab aana", "when to arrive", "check in time", "check-in"],
    answer: `🕑 <strong>Check-in & Check-out Times:</strong><br><br>• <strong>Check-in:</strong> 2:00 PM onwards<br>• <strong>Check-out:</strong> 11:00 AM (latest)<br><br>📌 Contact your host <strong>24 hours before arrival</strong><br>🪪 Always carry a <strong>government-issued ID</strong> (Aadhaar, Passport, Voter ID)<br>💡 Early check-in may be available — ask the host!`
  },
  {
    keywords: ["check out", "checkout", "check-out", "check out time", "kab jaana", "late checkout"],
    answer: `🕙 <strong>Check-out Details:</strong><br><br>• Standard check-out: <strong>11:00 AM</strong><br>• Late check-out (after 11 AM) → ask host, may cost extra<br>• Early departure → no refund for unused nights<br><br>🧹 Please leave the property clean and return all keys.`
  },
  {
    keywords: ["travel tips", "travel guide", "tips", "advice", "travel help", "travel advice", "trip tips", "travel info"],
    answer: `✈️ <strong>MusafirKhana Travel Guide:</strong><br><br><strong>Before You Go:</strong><br>• Book at least 3–7 days in advance<br>• Read property reviews carefully<br>• Contact host 24 hrs before arrival<br>• Download offline maps<br><br><strong>What to Carry:</strong><br>• Government ID 🪪 | Booking screenshot 📱<br>• Emergency cash + Power bank 🔋<br><br><strong>Emergency Numbers:</strong><br>• National Emergency: <strong>112</strong> 🚨<br>• Tourist Helpline: <strong>1363</strong> 📞`
  },
  {
    keywords: ["safety", "safe", "safe travel", "security", "safe stay", "is it safe", "safety tips"],
    answer: `🛡️ <strong>Safety on MusafirKhana:</strong><br><br>• All listings are <strong>verified</strong> by our team<br>• Hosts are background-checked<br>• Read reviews before booking<br><br><strong>Safety Tips:</strong><br>• Share trip details with family/friends<br>• Use in-app messaging for all communication<br>• Emergency: call <strong>112</strong> 🚨<br><br>📧 Report issues: support@musafirkhana.com`
  },
  {
    keywords: ["documents", "id", "aadhaar", "passport", "id proof", "id required", "document required", "id chahiye", "which id"],
    answer: `🪪 <strong>Required Documents for Check-in:</strong><br><br><strong>Any one of the following:</strong><br>• Aadhaar Card ✅ | Passport ✅<br>• Voter ID ✅ | Driving License ✅<br>• PAN Card (with photo) ✅<br><br>📌 Original or digital copy (Digilocker) accepted<br>🌍 International guests: Passport mandatory`
  },
  {
    keywords: ["budget", "cheap", "affordable", "low price", "sasta", "kam price", "budget stay", "cheap stay", "low cost", "economical"],
    answer: `💰 <strong>Finding Budget Stays:</strong><br><br><strong>Tips to Save Money:</strong><br>• Book <strong>7+ days in advance</strong> for best prices<br>• Travel on <strong>weekdays</strong> — cheaper than weekends<br>• Filter by Price: Low to High<br>• Look for <strong>free breakfast</strong> listings<br><br><strong>Budget Categories:</strong><br>• 🏕️ Dorms: ₹300–800/night<br>• 🏠 Budget Rooms: ₹800–1500/night<br>• 🏡 Mid-range: ₹1500–3000/night<br>• 🏨 Premium: ₹3000+/night`
  },
  {
    keywords: ["best places", "where to go", "destinations", "top places", "tourist places", "kaha jaana", "destination", "where travel", "places to visit"],
    answer: `🗺️ <strong>Popular Destinations:</strong><br><br>🏔️ <strong>Mountains:</strong> Manali, Darjeeling, Coorg<br>🏖️ <strong>Beaches:</strong> Goa, Varkala Kerala, Andamans<br>🏛️ <strong>Heritage:</strong> Jaipur, Udaipur, Varanasi, Hampi<br>🌿 <strong>Nature:</strong> Jim Corbett, Kaziranga, Coorg<br><br>Browse listings to find amazing stays at all these locations! 🔍`
  },
  {
    keywords: ["listings", "available listings", "show listings", "properties", "places to stay", "show me", "view listings", "available"],
    answer: `🏨 <strong>Browsing Listings on MusafirKhana:</strong><br><br>• Visit the <strong>Home Page</strong> to see all available properties<br>• Use <strong>filters</strong> to search by location, price & category<br>• Sort by <strong>Price: Low to High</strong> for budget options<br>• Click any listing to see photos, amenities & reviews<br><br><strong>Categories:</strong> 🏔️ Mountains | 🏖️ Beaches | 🏛️ Heritage | 🌿 Nature<br><br>Click <strong>"Listings"</strong> in the top menu to explore all!`
  },
  {
    keywords: ["amenities", "wifi", "ac", "parking", "pool", "kitchen", "breakfast", "facilities", "kya milega", "features"],
    answer: `🏡 <strong>Common Amenities:</strong><br><br><strong>Usually Included:</strong><br>• WiFi 📶 | AC / Heating ❄️🔥<br>• Clean Bedding & Towels 🛏️<br>• Hot Water 🚿 | Basic Toiletries 🧴<br><br><strong>Sometimes Available:</strong><br>• Parking 🚗 | Kitchen 🍳 | Pool 🏊<br>• Breakfast 🥞 | TV / Netflix 📺<br><br>💡 Each listing page shows exact amenities available!`
  },
  {
    keywords: ["account", "login", "signup", "password", "forgot password", "cant login", "login nahi", "password bhool", "sign up", "register"],
    answer: `👤 <strong>Account Help:</strong><br><br><strong>Forgot Password:</strong><br>1. Click "Login" → "Forgot Password?"<br>2. Enter your registered email<br>3. Check email for reset link (check spam!)<br>4. Set new password<br><br><strong>Can't Login?</strong><br>• Check Caps Lock | Clear browser cache<br>• Try "Forgot Password" to reset<br><br>📧 Still stuck? Email: support@musafirkhana.com`
  },
  {
    keywords: ["contact", "support", "helpline", "complaint", "issue", "problem", "contact us", "customer care", "phone number"],
    answer: `📞 <strong>Contact MusafirKhana Support:</strong><br><br>• 📧 <strong>Email:</strong> support@musafirkhana.com<br>• 📞 <strong>Tourist Helpline:</strong> 1363 (24/7)<br>• 🚨 <strong>Emergency:</strong> 112<br><br><strong>Response Times:</strong><br>• Safety issues → 2 hours<br>• Booking issues → 24 hours<br>• General queries → 48 hours<br><br>⏰ Support: Mon–Sun, 9 AM – 9 PM IST`
  },
  {
    keywords: ["host", "list my property", "become host", "add listing", "rent my place", "list property", "add property", "host kaise"],
    answer: `🏠 <strong>Become a MusafirKhana Host:</strong><br><br>1. Sign up / Log in to your account<br>2. Click <strong>"List Your Property"</strong> (top menu)<br>3. Add property details & upload 5+ photos<br>4. Set your price per night<br>5. Submit for review — approved in <strong>24–48 hrs</strong><br><br>💰 Listing is <strong>FREE</strong> — small commission on bookings only!`
  },
  {
    keywords: ["dispute", "complaint", "bad experience", "fraud", "scam", "not as shown", "different property", "refund dispute"],
    answer: `⚠️ <strong>Raising a Dispute:</strong><br><br>1. Take photos/videos as evidence<br>2. Contact host first via app messaging<br>3. If unresolved → contact support within <strong>24 hours of checkout</strong><br>4. Email: support@musafirkhana.com with booking ID + evidence<br><br>Emergency at property → call <strong>112</strong> 🚨`
  },
  {
    keywords: ["hi", "hello", "hey", "hii", "namaste", "namaskar", "good morning", "good evening", "sup", "start"],
    answer: `👋 <strong>Hello! Welcome to MusafirKhana!</strong><br><br>I'm MusaphirBot and I can help you with:<br><br>🏨 <strong>Bookings</strong> — How to book, modify, or cancel<br>💰 <strong>Refunds</strong> — Cancellation & refund policies<br>✈️ <strong>Travel Guide</strong> — Tips, destinations, safety<br>💳 <strong>Payments</strong> — Methods & payment issues<br>📞 <strong>Support</strong> — How to contact us<br><br>Tap a quick question below or type anything! ⬇️`
  },
  {
    keywords: ["thank you", "thanks", "thankyou", "shukriya", "dhanyawad", "great", "perfect", "awesome", "helpful", "ok thanks"],
    answer: `😊 <strong>You're welcome!</strong> Happy to help!<br><br>Is there anything else I can help you with?<br><br>🏨 Bookings | 💰 Refunds | ✈️ Travel Tips | 📞 Support<br><br>Have a wonderful trip with MusafirKhana! 🧳✨`
  },
  {
  keywords: ["travel agent", "agent", "plan my trip", "trip plan", "itinerary", "plan trip", "help plan", "plan karo", "agent help", "trip planner", "travel planner", "customize trip", "custom trip"],
  answer: `🧑‍💼 <strong>MusafirKhana Travel Agent Service:</strong><br><br>
Our travel agents can help you plan a <strong>fully customized trip</strong>!<br><br>
<strong>What we help with:</strong><br>
- 🗺️ Custom itinerary planning<br>
- 🏨 Finding best stays in your budget<br>
- 🚗 Transport & cab arrangements<br>
- 🎯 Local activity recommendations<br>
- 📋 Group & family trip planning<br><br>
<strong>How to reach our travel agents:</strong><br>
- 📧 Email: agents@musafirkhana.com<br>
- 📞 Call: 1363 (Mon–Sun, 9AM–9PM IST)<br>
- 💬 Use the chat on our <strong>Contact Us</strong> page<br><br>
<strong>Response time:</strong> Within 2–4 hours on working days ⏱️`
},
];

function searchFAQ(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  const scores = [];
  for (const faq of FAQ_INDEX) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (msg.includes(kw)) score += kw.length * 2;
      const words = msg.split(/\s+/);
      for (const word of words) {
        if (word.length > 3 && kw.includes(word)) score += word.length;
      }
    }
    if (score > 0) scores.push({ faq, score });
  }
  scores.sort((a, b) => b.score - a.score);
  return scores.length > 0 ? scores[0].faq : null;
}

router.post("/chat", (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const matched = searchFAQ(message);
    if (matched) return res.json({ reply: matched.answer });

    return res.json({
      reply: `🤔 I'm not sure about that, but here's what I can help with:<br><br>• <strong>Refund Policy</strong> — ask "refund policy"<br>• <strong>How to Book</strong> — ask "how to book"<br>• <strong>Check-in Time</strong> — ask "check-in time"<br>• <strong>Payment Methods</strong> — ask "payment methods"<br>• <strong>Travel Tips</strong> — ask "travel tips"<br>• <strong>Contact Support</strong> — ask "contact support"<br><br>📧 For complex issues: support@musafirkhana.com`
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
