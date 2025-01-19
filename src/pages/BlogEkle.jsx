import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import { addBlog } from "../api/api";
import { toast } from "react-toastify";


function BlogEkle() {

    const { user } = useAuth()
    const [blogObj, setBlogObj] = useState({
        title: "",
        content: "",
        authorId: "",
        authorName: "",
        imageUrl: "",
    })

    const updateValue = (e) => {
        const { name, value } = e.target
        setBlogObj({ ...blogObj, [name]: value })
    }

    async function handleAddBlog(e) {
        e.preventDefault()
        try {
            await addBlog({
                title: blogObj.title,
                content: blogObj.content,
                authorId: user.uid,
                authorName: user.displayName,
                authorPhotoURL: user.photoURL,
                imageUrl: blogObj.imageUrl
            })
            setBlogObj({
                title: "",
                content: "",
                authorId: "",
                authorName: "",
                imageUrl: ""
            })
            toast.success("Blog başarıyla eklendi")
        } catch (error) {
            console.log(error)
            toast.error("Blog eklenirken bir hata oluştu")
        }
    }

    return (
        <Layout>
            <form onSubmit={handleAddBlog} className="container mx-auto mt-10 space-y-4 p-2">
                <div className="space-y-2">
                    <span className="font-bold">Blog Başlığı</span>
                    <input onChange={updateValue} value={blogObj.title} name="title" type="text" className="w-full p-2 rounded-md outline-none" />
                </div>
                <div className="space-y-2">
                    <span className="font-bold">Blog Fotoğrafı</span>
                    <input onChange={updateValue} value={blogObj.imageUrl} name="imageUrl" type="text" className="w-full p-2 rounded-md outline-none" />
                </div>
                <div className="space-y-2">
                    <span className="font-bold">Blog İçeriği</span>
                    <textarea onChange={updateValue} value={blogObj.content} name="content" type="text" className="w-full p-2 rounded-md outline-none"></textarea>
                </div>
                <button type="submit" className="btn btn-square btn-outline block m-auto w-full">Blog Ekle</button>
            </form>
        </Layout>
    );
}

export default BlogEkle;