// 🔥 KAYIT
function register() {
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  if (!email.endsWith("@gmail.com")) {
    alert("Email @gmail.com ile bitmeli!");
    return;
  }

  if (password.length < 6) {
    alert("Şifre en az 6 karakter olmalı!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // email var mı
  let exists = users.some(u => u.email === email);
  if (exists) {
    alert("Bu email zaten kayıtlı ❌");
    return;
  }

  let lastId = localStorage.getItem("lastUserId");
  if (!lastId) lastId = 200500;
  else lastId = Number(lastId) + 1;

  let newUser = {
    email: email,
    password: password,
    id: lastId,
    balance: 0
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("lastUserId", lastId);

  alert("Kayıt başarılı!");
  window.location.href = "login.html";
}


// 🔥 GİRİŞ
function login() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", user.email);
    localStorage.setItem("userId", user.id);

    alert("Giriş başarılı!");
    window.location.href = "dashboard.html";
  } else {
    alert("Email veya şifre yanlış ❌");
  }
}