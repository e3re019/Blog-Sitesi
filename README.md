# BLOG SİTESİ

Herkese merhabalar. Bu kodlarda sizlerin kendinizi açıklayabileceğiniz, insanların sizlere rahatça not yazabileceği, sizde onları admin panelinden takip edebileceğiniz bir paket yaptım sizlere. Kısaca paketten bahsetmek istiyorum. Paketimiz bir blog sitesidir ve içerisinde Ana Sayfa, Bağış yapma, kayıt olma ve giriş yapma gibi birçok eklenti mevcuttur. Ben bunları yaparken azda olsa yoruldum ve bunları sizlerle paylaşmak istiyorum.

# ÖZELLİKLER

· Kullanıcı kayıt sistemi

· Kullanıcı giriş sistemi

· Şifrelerin bcrypt ile güvenli şekilde saklanması

· MongoDB veritabanı desteği

· Not oluşturma sistemi

· Admin paneli

· Tüm notları silme özelliği

· Kullanıcıları görüntüleme

· Kullanıcıları tek tek silme

· Responsive tasarım

· Express.js backend yapısı

# KULLANILAN TEKNOLOJİLER

**Backend**

· Node.js

· Express.js

· MongoDB Atlas

· Mongoose

· bcryptjs



**Frontend**

· HTML5

· CSS3

· JavaScript

# GÜVENLİK

· Şifreler bcrypt ile hashlenir.

· MongoDB Atlas kullanılır.

· Admin paneli korumalıdır.

· Kullanıcı şifreleri istemcilere gönderilmez.

# LİSANS

· Bu proje eğitim ve geliştirme amaçlı hazırlanmıştır. Bundan dolayı lisans gerektirmez.

# KURULUM

Sizleri en çok yoracak yer burası. Öncelikle https://code.visualstudio.com/ adresinden programı kurunuz. Sonrasında tüm eklentileri oluşturduğunuz klasörün içine atın. Daha sonrasında aşağıda belirtmiş olduğum kodları sırasıyla terminalde başlatın. Terminali açmak için ise programı açtığınızda üst kısımda terminal yazmaktadır. Ona tıklayınca "New Terminal"
yazısı göreceksiniz. Ona tıklayınca terminal açılır. Tüm kodları kurduktan sonra https://www.mongodb.com/ linkine tıklayın ve oradan kayıt olun. Kayıt olunca sizlere ID verecektir onu da aşağıda belirtmiş olduğum yere giriniz. Yalnız not düşmeliyim o kodları bir kere kapat derseniz kendinize yeni bir veritabanı açmanız gerekmektedir. Bundan dolayı o ID penceresinde yükleme yeri var ordan siz ID leri indirmenizi öneririrm. Herşeyi halledince geriye sunucu düzenlemesi kalıyor onları da teker teker aramayın diye aşağıya bırakıyorum.

**KODLAR;**

Kodları sırasıyla teker teker atmanız gerekmektedir!

· npm install

· npm install express 

· npm install mongoose 

· npm install bcryptjs 

· npm install dotenv

**DÜZENLENECEK YERLER;**

· admin.html = 6 - 167 - 181. satırlardır.

· donate.html = 6 - 20 - 40 (Buraya kendi bağış adresinizi yazacaksınız. Örn. ByNoGame). satırlarıdır.

· index.html = 6- 15 - 34 - 43 - 48 - 53 - 58 - 63 - 68. satırlardır.

· login.html = 6 - 14. satırlardır.

· register.html = 6 - 14. satırlardır

· server.js = 15 (buraya mongodb deki ID yi yapıştıracaksınız.). satırdır.

**NOT! : Heryerde e3re_0 yazabilir. Ctrl + H yapıp hepsini kendi isminiz yapmayın çünkü skriptler o ada göre yazıldı. Değiştirmeniz sonucu site bozulabilir. Bundan dolayı sizlere belirttiğim yerleri değiştirmenizi öneririm.**

# ÇALIŞTIRMA

Herşey eğer sorunsuz çalışıyorsa tebrik ederim. Sunucuyu kurmuş olmalısın. Deneme için ise terminale şunu yaz : **node server.js** bunu yazınca çok az bekle sunucu çalışıyor yazmalı. Daha sonra mongodb bağlandı derse sunucuyu doğru kurmuşsun demektir. Diğer türlü Mongodb hatası derse de herhangi bir AI dan yardım alabilirsin veya benimle iletişime geçebilirsin.

# SON SÖZ

Sitemi beğendiysen sevindim. Benimle istediğin zaman iletişime geçebilirsin. Bilgilerimi alta bırakıyorum. İstek, öneri vb. her konu için açığımdır.

E-Posta : 35eemree@gmail.com








