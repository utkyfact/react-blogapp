import React, { useState } from "react";
import { updateBlog } from "../api/api";
import { toast } from "react-toastify";




function EditModalForm({ fetchBlog, blog, isOpen, setIsOpen }) {

    const [blogObj, setBlogObj] = useState({
        title: blog.title,
        content: blog.content,
        imageUrl: blog.imageUrl,
    })

    const updateValue = (e) => {
        const { name, value } = e.target
        setBlogObj({ ...blogObj, [name]: value })
    }

    async function handleEdit(e) {
        e.preventDefault()
        try {
            await updateBlog({...blogObj,id:blog.id })
            toast.success("Blog başarıyla güncellendi!")
            await fetchBlog()
            setIsOpen(false)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }




    return ( 
        <>
            <form onSubmit={handleEdit} className="container mx-auto mt-10 space-y-4 p-2">
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
                <button type="submit" className="btn btn-square btn-outline block m-auto w-full rounded-md">Kaydet</button>
            </form>
        </>
     );
}

export default EditModalForm;