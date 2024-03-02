import { useNavigate, useParams } from "react-router-dom"
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { BASE_URL } from "../utils/config"
import Comment from "./Comment"
import Likes from "./Likes"
import './PostDetails.css';
import { useFetch } from "../hooks/useFetch"

const PostDetails = () => {
  const postId = useParams().id
  // const postId = "65cb48ea552e6d7dbbf8c128"
  const [post, setPost] = useState({})
  const { user } = useContext(AuthContext)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")

  const navigate = useNavigate()

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/get/${postId}`)
      setPost(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeletePost = async () => {
    try {
      // const res = useFetch(`${BASE_URL}/api/posts/delete/${postId}`)
      const res = await axios.delete(`${BASE_URL}/api/posts/deletePost/${postId}`)
      console.log(res.data)
      navigate("/blogs")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/comments/get/${postId}`)
      setComments(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPostComments()
  }, [postId])

  const postComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/api/comments/createComments`,
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true })
      window.location.reload(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
          {user?._id === post?.userId && (
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer" onClick={() => navigate(`/posts/edit/${postId}`)}><BiEdit /></p>
            <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
          </div>
        )}
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {console.log('img:    ')}
        {console.log(post.photo)}
        <img src={`${BASE_URL}/${post.photo} `} className="post-image" alt="..." />
        <p className="mx-auto mt-8">{post.desc}</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">{c}</div>
            ))}
          </div>
        </div>
        <div>
          <p>Likes: {post.likes} </p>
          <Likes post={post} />
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {comments?.map((c) => (
            <Comment key={c._id} c={c} post={post} />
          ))}
        </div>
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
          <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>
      </div>
    </div>
  )
}

export default PostDetails
