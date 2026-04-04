const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "users.json";

// 🔥 تأكد الملف موجود
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, "[]");
  console.log("users.json oluşturuldu ✅");
}

// 📥 قراءة البيانات
function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(FILE));
  } catch (err) {
    console.log("JSON hata:", err);
    return [];
  }
}

// 💾 حفظ البيانات
function saveUsers(users) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

// 🔢 توليد ID
function generateId(users) {
  let id;
  do {
    id = Math.floor(100000 + Math.random() * 900000);
  } while (users.some(u => u.id == id));
  return id;
}

// 🟢 تسجيل
app.post("/register", (req, res) => {
  console.log("REGISTER isteği geldi");

  let users = readUsers();
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: "missing data" });
  }

  if (users.find(u => u.email === email)) {
    return res.json({ error: "email exists" });
  }

  let newUser = {
    email,
    password,
    id: generateId(users),
    balance: 0
  };

  users.push(newUser);
  saveUsers(users);

  console.log("Yeni kullanıcı:", newUser);

  res.json({ success: true });
});

// 🔵 تسجيل دخول
app.post("/login", (req, res) => {
  console.log("LOGIN isteği geldi");

  let users = readUsers();
  let { email, password } = req.body;

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ error: "wrong" });
  }

  res.json(user);
});

// 👤 جلب مستخدم
app.get("/user/:id", (req, res) => {
  console.log("USER GET:", req.params.id);

  let users = readUsers();
  let user = users.find(u => u.id == req.params.id);

  if (!user) return res.json({ error: "not found" });

  res.json(user);
});

// 💰 اضافة رصيد
app.post("/add-balance", (req, res) => {
  console.log("ADD BALANCE");

  let users = readUsers();
  let { id, amount } = req.body;

  let user = users.find(u => u.id == id);

  if (!user) return res.json({ error: "no user" });

  user.balance += Number(amount);
  saveUsers(users);

  res.json({ success: true });
});

// 🧪 اختبار
app.get("/", (req, res) => {
  res.send("Server çalışıyor 🔥");
});

// 🚀 تشغيل السيرفر
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});