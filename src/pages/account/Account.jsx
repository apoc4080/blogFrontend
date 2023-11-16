import React, { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./account.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from "axios"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export const Account = () => {
  const { user, dispatch } = useContext(Context)

  // same from create file
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [succ, setSucc] = useState(false)
  const PublicFlo = ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            const updateUser = {
              userId: user._id,
              username,
              email,
              password,
              profilePic: downloadURL
            }
            try {
              const res = await axios.put("https://blogbackend-12nr.onrender.com/users/" + user._id, updateUser)
              setSucc(true)
              dispatch({ type: "UPDATE_SUCC", payload: res.data })
              window.location.reload()
            } catch (error) { dispatch({ type: "UPDATE_FAILED" }) }
          });
        }
      );
    } else {
      const updateUser = {
        userId: user._id,
        username,
        email,
        password,
      }
      try {
        const res = await axios.put("https://blogbackend-12nr.onrender.com/users/" + user._id, updateUser)
        setSucc(true)
        dispatch({ type: "UPDATE_SUCC", payload: res.data })
        window.location.reload()
      } catch (error) {
        dispatch({ type: "UPDATE_FAILED" })
      }
    }
  }
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <img
                  src={file ? URL.createObjectURL(file) : ( user.profilePic === "" ? "log.png" : user.profilePic)}
                  alt=''
                />
                <label htmlFor='inputfile'>
                  <IoIosAddCircleOutline className='icon' />
                </label>
                <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <form className='right' onSubmit={handleSubmit}>
              <label htmlFor=''>Username</label>
              <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor=''>Email</label>
              <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor=''>Password</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
              <button className='button' type='submit'>
                Update
              </button>
              {succ && <span>Profile is Updated</span>}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
