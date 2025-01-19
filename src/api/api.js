import { updateEmail, updateProfile } from "firebase/auth"
import { auth } from "../firebase/config"
import { collection, serverTimestamp, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const changeProfileName = ({name}) => {
    return updateProfile(auth.currentUser, {
        displayName:name
    })
}

const changeProfilePhoto = ({photoURL}) => {
    return updateProfile(auth.currentUser, {
        photoURL: photoURL
    })
}

const changeEmail = ({email}) => {
    return updateEmail(auth.currentUser, email)
} 

const addBlog = ({title, content, imageUrl, authorId, authorName, authorPhotoURL}) => {
    const blogCollection = collection(db, "blogs")

    const blogData = {
        title,
        content,
        imageUrl,
        authorId,
        authorName,
        authorPhotoURL,
        createdAt:serverTimestamp()
    }
    return addDoc(blogCollection, blogData)
}

const getBlogs = async () => {
    const blogCollection = collection(db, "blogs")
    return getDocs(blogCollection)
}

const getBlogById = async (id) => {
    const blogDocRef = doc(db, "blogs", id)
    const blogDoc = await getDoc(blogDocRef)

    return {...blogDoc.data(),id:blogDoc.id}
    
}

const deleteBlog = (id) => {
    const blogDocRef = doc(db, "blogs", id)
    return deleteDoc(blogDocRef)
}

const updateBlog = (blog) => {
    const blogDocRef = doc(db, "blogs", blog.id)
    return updateDoc(blogDocRef, {
        title: blog.title,
        content: blog.content,
        imageUrl: blog.imageUrl
    })
}

export { changeProfileName, changeProfilePhoto, changeEmail, addBlog, getBlogs, getBlogById, deleteBlog, updateBlog }