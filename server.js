const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB Bağlantısı
  mongoose.connect(
  "BURAYA_MONGODB_BAĞLANTI_STRINGİNİZİ_YAPISTIRIN"
)
.then(() => {
    console.log("✅ MongoDB bağlandı");
})
.catch((err) => {
    console.error("❌ MongoDB hatası:", err);
});

// User Şeması
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

// Note Şeması
const NoteSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    note: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);
const Note = mongoose.model("Note", NoteSchema);

// REGISTER
app.post("/api/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Tüm alanları doldurun."
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Kullanıcı zaten mevcut."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            message: "Kayıt başarılı."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Veritabanı hatası oluştu."
        });
    }
});

// LOGIN
app.post("/api/login", async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({
            username: username
        });

        if (!user) {
            return res.status(400).json({
                message: "Kullanıcı bulunamadı."
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(400).json({
                message: "Şifre yanlış."
            });
        }

        res.json({
            message: "Giriş başarılı.",
            user: user.username,
            role: user.role
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Sunucu hatası."
        });
    }
});

// TÜM KULLANICILAR
app.get("/api/get-users", async (req, res) => {
    try {

        const users = await User.find(
            {},
            {
                password: 0
            }
        ).sort({
            created_at: -1
        });

        res.json(users);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});

// NOT EKLE
app.post("/api/add-note", async (req, res) => {
    try {

        const { username, note } = req.body;

        const newNote = new Note({
            username,
            note
        });

        await newNote.save();

        res.json({
            message: "Not kaydedildi."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});

// TÜM NOTLARI SİL
app.delete("/api/delete-all-notes", async (req, res) => {
    try {

        await Note.deleteMany({});

        res.json({
            message: "Tüm notlar başarıyla silindi."
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
});

// SUNUCU
app.listen(3000, () => {
    console.log("🚀 Sunucu çalışıyor: http://localhost:3000");
});