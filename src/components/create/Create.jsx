import React from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useHistory } from "react-router-dom"


export const Create = () => {
  const hateSpeechKeywords = ["hate", "offensive", "racist", "profanity", "etc"];
  function containsHateSpeech(text) {
    const regex = new RegExp(hateSpeechKeywords.join("|"), "i");
    return regex.test(text);
  }


  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false);
  const { user } = useContext(Context)
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (containsHateSpeech(title) || containsHateSpeech(desc)) {
      window.alert("Hate speech or offensive content detected. Please revise your post.");
    } else {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);
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
              const newPost = {
                username: user.username,
                title,
                desc,
                photo: downloadURL,
              }
              try {
                console.log(newPost);
                await axios.post("https://blogbackend-12nr.onrender.com/posts", newPost)
                history.push('/');
              } catch (error) { }
            });
            setUploading(false);
          }
        );
      } else {
        const newPost = {
          username: user.username,
          title,
          desc
        }
        try {
          console.log(newPost);
          await axios.post("https://blogbackend-12nr.onrender.com/posts", newPost)
          history.push('/');
        } catch (error) { }
      }
    }
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                <IoIosAddCircleOutline />
              </label>
              <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <textarea name='' id='' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            {uploading ? (
              <div>
                <p>Uploading .. Please Wait</p>
              </div>
            ) : (
              <button className="button">Create Post</button>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
