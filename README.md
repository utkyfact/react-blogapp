# HW Blog - Firebase Blog Uygulaması

Bu proje, React ve Firebase kullanılarak geliştirilmiş modern bir blog platformudur. Kullanıcılar blog yazıları oluşturabilir, düzenleyebilir ve silebilir.

## 🚀 Özellikler

- 👤 Kullanıcı Kimlik Doğrulama
  - Email/Şifre ile kayıt ve giriş
  - Google ile giriş
  - Şifre sıfırlama
  - Email doğrulama

- 📝 Blog İşlemleri
  - Blog yazısı oluşturma
  - Blog yazısı düzenleme
  - Blog yazısı silme
  - Blog detay sayfası

- 🎨 Kullanıcı Arayüzü
  - Responsive tasarım
  - 30+ tema seçeneği
  - Animasyonlu geçişler
  - Toast bildirimler

## 🛠️ Kullanılan Teknolojiler

- React 18.3
- Firebase 11.1
- Tailwind CSS
- DaisyUI
- React Router
- React Toastify
- Framer Motion
- React Icons

## ⚙️ Kurulum

1. Projeyi klonlayın

git clone https://github.com/utkyfact/react-blogapp.git

2. Proje dizinine gidin

```bash
cd firebase-deneme2
```

3. Gerekli paketleri yükleyin

```bash
npm install
```

4. Firebase yapılandırması için `.env` dosyası oluşturun
```env
VITE_APIKEY=your_api_key
VITE_AUTHDOMAIN=your_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucket
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id
VITE_MEASUREMENTID=your_measurement_id
```

5. Uygulamayı başlatın
```bash
npm run dev
```
