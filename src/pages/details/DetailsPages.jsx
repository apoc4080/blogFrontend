import React, { useContext, useEffect, useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/product1.jpg"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { Context } from "../../context/Context"

export const DetailsPages = () => {
  const location = useLocation()
  console.log(location)
  const path = location.pathname.split("/")[2]

  // step 4 for update
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)

  //setp 2
  const [post, setPost] = useState({})
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("https://blogbackend-12nr.onrender.com/posts/" + path)
      console.log(res)
      //setp 2
      setPost(res.data)
      //setp 4
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  // step 3
  // file create garne time add garne
  const PublicFlo = ""
  const { user } = useContext(Context)

  const handleDelete = async () => {
    try {
      await axios.delete(`https://blogbackend-12nr.onrender.com/posts/${post._id}`, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) { }
  }

  // setp 4
  const handleUpdate = async () => {
    try {
      await axios.put(`https://blogbackend-12nr.onrender.com/posts/${post._id}`, { username: user.username, title, desc })
      window.location.reload()
    } catch (error) { }
  }

  return (
    <>
      <section className='singlePage'>
        {
          update ? (
            <div className='container'>
              <div className='left'>
                {post.photo && <img src={post.photo} alt='' />}
              </div>
              <div className='right'>
                <input
                  type='text'
                  value={title}
                  className='updateInput'
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p>
                  {/* Author: <Link to={`/?user=${post.username}`}>{post.username}</Link> */}
                  Author: {post.username}
                </p>
                {post.username === user?.username && (
                  <div className='buttons'>
                    <button className='button' onClick={() => setUpdate(true)}>
                      <BsPencilSquare />
                    </button>
                    <button className='button' onClick={handleDelete}>
                      <AiOutlineDelete />
                    </button>
                    {update && (
                      <button className='button' onClick={handleUpdate}>
                        Update
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="below">
                <textarea
                  value={desc}
                  cols='30'
                  rows='100'
                  className='updateInput'
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
            </div>
          ) : (
            <div className='container'>
              <div className='left'>
                {post.photo && <img src={post.photo} alt='' />}
              </div>
              <div className='right'>
                <h1>{post.title}</h1>
                <p>
                  {/* Author: <Link to={`/?user=${post.username}`}>{post.username}</Link> */}
                  Author: {post.username}
                </p>
                {post.username === user?.username && (
                  <div className='buttons'>
                    <button className='button' onClick={() => setUpdate(true)}>
                      <BsPencilSquare />
                    </button>
                    <button className='button' onClick={handleDelete}>
                      <AiOutlineDelete />
                    </button>
                    {update && (
                      <button className='button' onClick={handleUpdate}>
                        Update
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="below">
                <pre>{post.desc}</pre>
              </div>
            </div>
          )
        }
      </section>
    </>
  )
}
