import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlogById } from "../api/api";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalLayout from "../components/Modal";
import DeleteModalForm from "../components/DeleteModalForm";
import EditModalForm from "../components/EditModalForm";
function BlogDetail() {

    const { user } = useAuth()
    const { id } = useParams()

    const [blog, setBlog] = useState(null)
    const [showMenu, setShowMenu] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    async function fetchBlog() {
        const result = await getBlogById(id)
        setBlog(result)
    }

    useEffect(() => {
        fetchBlog()
    }, [])

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 py-8"
            >
                {blog && (
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
                        />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-lg shadow-lg p-8"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                        <img src={blog.authorPhotoURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-gray-800">{blog.authorName}</h4>
                                        <p className="text-gray-500 text-sm">Yazar</p>
                                    </div>
                                </div>

                                {/* Üç nokta */}
                                {user && blog.authorId === user.uid && (
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMenu(!showMenu)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <BsThreeDotsVertical className="text-xl" />
                                        </button>

                                        {showMenu && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => {
                                                        // Düzenleme fonksiyonu
                                                        setShowMenu(false);
                                                        setEditModal(true)
                                                    }}
                                                >
                                                    Düzenle
                                                </button>
                                                <button
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    onClick={() => {
                                                        // Silme fonksiyonu
                                                        setShowMenu(false),
                                                        setDeleteModal(true)
                                                    }}
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                                    {blog.content}
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <span className="text-gray-500 opacity-70">{blog.createdAt.toDate().toLocaleDateString()}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            <ModalLayout isOpen={deleteModal} setIsOpen={setDeleteModal}>
                <DeleteModalForm blog={blog} isOpen={deleteModal} setIsOpen={setDeleteModal} />
            </ModalLayout>

            <ModalLayout isOpen={editModal} setIsOpen={setEditModal}>
                <EditModalForm fetchBlog={fetchBlog} blog={blog} isOpen={editModal} setIsOpen={setEditModal} />
            </ModalLayout>
        </Layout>
    );
}

export default BlogDetail;