import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "animate.css";
import { CiSaveDown2 } from "react-icons/ci";
import { toast } from "react-toastify";
import { changeEmail, changeProfileName, changeProfilePhoto } from "../api/api";
import Layout from "../components/Layout";
import ModalLayout from "../components/Modal";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Link } from "react-router";

function ProfilePage() {
  const { user } = useAuth();
  const [profileObj, setProfileObj] = useState({
    email: "",
    name: "",
    photoURL: "",
    phoneNumber: "",
    password: "",
  });
  const [editEmailModal, setEditEmailModal] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileObj({
        ...profileObj,
        email: user.email,
        name: user.displayName ? user.displayName : "",
        photoURL: user.photoURL ? user.photoURL : "",
        phoneNumber: user.phoneNumber ? user.phoneNumber : "",
      });
    }
  }, [user]);

  async function handleUpdateName() {
    try {
      await changeProfileName(profileObj);
      toast.success("Profil adınız başarı ile güncellenmiştir.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function handleUpdatePhoto() {
    try {
      await changeProfilePhoto(profileObj);
      toast.success("Profil resminiz başarı ile güncellenmiştir.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function handleEmailModal() {
    if (profileObj.email !== "") {
      setEditEmailModal(true);
    }
  }

  async function handleUpdateEmail() {
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        profileObj.password
      );
      await reauthenticateWithCredential(user, credential);
      await changeEmail(profileObj);
      toast.success("Email adresiniz başarı ile güncellendi.");
      setEditEmailModal(false)
      setProfileObj(prev => ({...prev, password: ""}))
    } catch (error) {
      console.log(error);
      
      switch (error.code) {
        case 'auth/wrong-password':
          toast.error("Girdiğiniz şifre hatalı");
          break;
        case 'auth/requires-recent-login':
          toast.error("Bu işlem için yakın zamanda giriş yapmanız gerekiyor");
          break;
        case 'auth/email-already-in-use':
          toast.error("Bu email adresi başka bir hesap tarafından kullanılıyor");
          break;
        case 'auth/invalid-email':
          toast.error("Geçersiz email formatı");
          break;
        default:
          toast.error(error.message || "Email güncellenirken bir hata oluştu");
      }
    }
  }

  const updateValue = (e) => {
    const { value, name } = e.target;
    setProfileObj({ ...profileObj, [name]: value });
  };

  return (
    <Layout>
      <div className={`min-h-screen bg-base-200 ${editEmailModal ? "overflow-hidden" : ""}`}>
        <section className="container mx-auto">
          {/* Profil Kartı */}
          <div className="card flex flex-col items-center justify-center shadow-xl animate-fade-in py-20 space-y-5">
            <Link to="/add-blog" className="btn btn-square btn-outline block ms-auto me-10 p-2">Blog Ekle</Link>
            <div className="card-body bg-base-100 rounded-lg md:w-1/3">
              {/* Başlık */}
              <h2 className="text-center animate__animated animate__fadeInDown text-2xl">
                <i className="fas fa-user-circle"></i> Profil Bilgileri
              </h2>

              {/* Profil Resmi */}
              <div className="text-center my-4">
                <div className="avatar hover:scale-125 duration-200">
                  <div className="w-24 rounded-full animate__animated animate__bounceIn">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" />
                    ) : (
                      <img src="./user.png" alt="Profile" />
                    )}
                  </div>
                </div>
              </div>

              {/* Profil Bilgileri */}
              <div className="space-y-4">
                {/* Profil Resmi */}
                <div className="bg-base-200 p-3 rounded-lg animate__animated animate__fadeInLeft space-y-3">
                  <span className="font-bold">Profil Resmi</span>
                  <div className="flex justify-between items-center">
                    <input
                      onChange={updateValue}
                      value={profileObj.photoURL}
                      name="photoURL"
                      type="text"
                      className="w-full p-3 rounded-md"
                    />
                    <button onClick={handleUpdatePhoto} className="btn btn-ghost p-3">
                      <CiSaveDown2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Kullanıcı Adı */}
                <div className="bg-base-200 p-3 rounded-lg animate__animated animate__fadeInRight space-y-3">
                  <span className="font-bold">Kullanıcı Adı</span>
                  <div className="flex justify-between items-center">
                    <input
                      onChange={updateValue}
                      value={profileObj.name}
                      name="name"
                      type="text"
                      className="w-full p-3 rounded-md"
                    />
                    <button onClick={handleUpdateName} className="btn btn-ghost p-3">
                      <CiSaveDown2 size={24} />
                    </button>
                  </div>
                </div>

                {/* E-posta */}
                <div className="bg-base-200 p-3 rounded-lg animate__animated animate__fadeInLeft space-y-3">
                  <span className="font-bold">E-posta</span>
                  <div className="flex justify-between items-center">
                    <input
                      onChange={updateValue}
                      value={profileObj.email}
                      name="email"
                      type="email"
                      className="w-full p-3 rounded-md"
                    />
                    <button onClick={handleEmailModal} className="btn btn-ghost p-3">
                      <CiSaveDown2 size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <ModalLayout isOpen={editEmailModal} setIsOpen={setEditEmailModal}>
        <div className="flex flex-col justify-center items-center h-full gap-5 p-4">
          <input
            onChange={updateValue}
            value={profileObj.password}
            placeholder="Parolanız"
            name="password"
            type="password"
            className="w-full p-3 rounded-md outline-none"
          />
          <button onClick={handleUpdateEmail} className="btn btn-outline w-full p-3">
            Gönder
          </button>
        </div>
      </ModalLayout>
    </Layout>
  );
}

export default ProfilePage;