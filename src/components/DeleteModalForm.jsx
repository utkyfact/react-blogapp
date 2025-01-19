import React from "react";
import { deleteBlog } from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function DeleteModalForm({ blog, isOpen, setIsOpen }) {

    const navigate = useNavigate()

    async function handleDelete() {
        try {
            await deleteBlog(blog.id)
            toast.success("Blog başarıyla silindi!")
            setIsOpen(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <>
            <h1><span className="font-bold">{blog.title}</span> isimli bloğu silmek istediğinize emin misiniz?</h1>
            <div className="flex justify-between mt-4">
                <button className="btn btn-neutral w-1/3 rounded-md" onClick={() => setIsOpen(false)}>Vazgeç</button>
                <button className="btn btn-error w-1/3 rounded-md" onClick={handleDelete}>Sil</button>
            </div>
        </>
    );
}

export default DeleteModalForm;