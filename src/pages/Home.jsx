import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getBlogs } from "../api/api";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";


function Home() {
    const { user } = useAuth()
    const [blogs, setBlogs] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchBlogs() {
        try {
            const result = await getBlogs()
            const blogsData = result.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setBlogs(blogsData)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchBlogs()
        setLoading(false)
    }, [])



    return (

        <Layout>
            <div className="h-[300dvh]">
                <div className="container mx-auto space-y-5 p-2 mt-10">
                    {
                        blogs && blogs.map(blog => (
                            <Link to={`/blogdetail/${blog.id}`} key={blog.id} className="card md:card-side bg-base-100 shadow-xl md:flex block">
                                <figure>
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        className="aspect-square object-cover w-full md:h-full h-48 " />
                                </figure>
                                <div className="card-body md:w-4/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <img src={blog.authorPhotoURL} alt="Profile" className="w-full h-full object-cover rounded-full" /> 
                                        </div>
                                        <p>{blog.authorName}</p>
                                    </div>
                                    <div className="md:ms-16 py-3 space-y-2">
                                        <h2 className="card-title">{blog.title}</h2>
                                        <p className="overflow-hidden text-ellipsis">{blog.content}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>


    );
}

export default Home;