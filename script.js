document.addEventListener("DOMContentLoaded", () => {
    // ==================================================
    // 1. MODAL (PENCERE) AÇMA / KAPAMA İŞLEMLERİ
    // ==================================================
    const authModal = document.getElementById("authModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeBtn = document.querySelector(".close-btn");
    const toRegisterBtn = document.getElementById("toRegisterBtn");
    const toLoginBtn = document.getElementById("toLoginBtn");
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const modalMsg = document.getElementById("modalMsg");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            if (authModal) {
                authModal.style.display = "flex";
                showSection("login");
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (authModal) authModal.style.display = "none";
            if (modalMsg) modalMsg.style.display = "none";
        });
    }

    if (toRegisterBtn) toRegisterBtn.addEventListener("click", () => showSection("register"));
    if (toLoginBtn) toLoginBtn.addEventListener("click", () => showSection("login"));

    function showSection(section) {
        if (modalMsg) modalMsg.style.display = "none";
        if (section === "login") {
            if (loginSection) loginSection.style.display = "block";
            if (registerSection) registerSection.style.display = "none";
        } else {
            if (loginSection) loginSection.style.display = "none";
            if (registerSection) registerSection.style.display = "block";
        }
    }

    // ==================================================
    // 2. KAYIT OLMA İŞLEMİ
    // ==================================================
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 

            const email = document.getElementById("regEmail").value.trim();
            const username = document.getElementById("regUser").value.trim();
            const password = document.getElementById("regPass").value;
            const passwordConfirm = document.getElementById("regPassConfirm").value;

            if (password !== passwordConfirm) {
                showModalMessage("Şifreler uyuşmuyor!", "red");
                return;
            }

            try {
                const response = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showModalMessage("Kayıt başarılı! Giriş yapabilirsiniz.", "green");
                    registerForm.reset();
                    setTimeout(() => showSection("login"), 2000);
                } else {
                    showModalMessage(data.message || "Kayıt sırasında hata oluştu.", "red");
                }
            } catch (err) {
                console.error("Kayıt fetch hatası:", err);
                showModalMessage("Sunucuyla iletişim kurulamadı!", "red");
            }
        });
    }

    // ==================================================
    // 3. GİRİŞ YAPMA İŞLEMİ
    // ==================================================
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault(); 

            const username = document.getElementById("loginUser").value.trim();
            const password = document.getElementById("loginPass").value;

            try {
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    showModalMessage(`Hoş geldin, ${data.user}!`, "green");
                    
                    localStorage.setItem("username", data.user);
                    localStorage.setItem("role", data.role);

                    setTimeout(() => {
                        if (data.role === "admin") {
                            window.location.href = "admin.html";
                        } else {
                            window.location.reload();
                        }
                    }, 1500);
                } else {
                    showModalMessage(data.message || "Kullanıcı adı veya şifre yanlış.", "red");
                }
            } catch (err) {
                console.error("Giriş fetch hatası:", err);
                showModalMessage("Sunucuyla iletişim kurulamadı!", "red");
            }
        });
    }

    function showModalMessage(text, color) {
        if (modalMsg) {
            modalMsg.innerText = text;
            modalMsg.style.color = color === "green" ? "#2ecc71" : "#e74c3c";
            modalMsg.style.display = "block";
        }
    }

    // ==================================================
    // 4. OTURUM KONTROLÜ
    // ==================================================
    const currentUsername = localStorage.getItem("username");
    const navbarLoginBtn = document.getElementById("loginBtn");
    const userMenu = document.getElementById("userMenu");
    const usernameText = document.getElementById("usernameText");
    const logoutBtn = document.getElementById("logoutBtn");

    if (currentUsername) {
        if (navbarLoginBtn) navbarLoginBtn.style.display = "none";
        if (userMenu) userMenu.style.display = "flex";
        if (usernameText) usernameText.innerText = currentUsername;

        // Ototmatik Doldurma: Giriş yapılmışsa not formundaki ismi kilitle ve doldur
        const noteUserField = document.getElementById("username");
        if (noteUserField) {
            noteUserField.value = currentUsername;
            noteUserField.readOnly = true;
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.reload();
        });
    }

    // ==================================================
    // 5. ZİYARETÇİ NOTU GÖNDERME İŞLEMİ
    // ==================================================
    const noteForm = document.getElementById("noteForm");
    if (noteForm) {
        noteForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const noteUsername = document.getElementById("username").value.trim();
            const noteContent = document.getElementById("userNote").value.trim();
            const formResponse = document.getElementById("formResponse");

            try {
                const response = await fetch("/api/add-note", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: noteUsername, note: noteContent })
                });

                const data = await response.json();

                if (response.ok) {
                    if (formResponse) {
                        formResponse.innerText = "Not başarıyla gönderildi!";
                        formResponse.style.color = "#2ecc71";
                        formResponse.style.display = "block";
                    }
                    document.getElementById("userNote").value = ""; // Formu temizle
                    
                    // Notları listeleyen fonksiyonu ileride buraya bağlayacağız
                    if (typeof loadNotes === "function") loadNotes();
                } else {
                    if (formResponse) {
                        formResponse.innerText = data.message || "Hata oluştu.";
                        formResponse.style.color = "#e74c3c";
                        formResponse.style.display = "block";
                    }
                }
            } catch (err) {
                console.error("Not gönderme hatası:", err);
                alert("Not gönderilirken sunucuyla bağlantı kurulamadı!");
            }
        });
    }
});