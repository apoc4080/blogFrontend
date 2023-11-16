import React, { useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
// import { BsBagCheck } from "react-icons/bs"
// import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Context } from "../../context/Context"
import { Link } from "react-router-dom"

export const User = () => {
  const { user, dispatch } = useContext(Context)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }

  // const PublicFlo = ""

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src={user.profilePic === "" ? "log.png" : user.profilePic} alt='name' />
              {/* <img src={user.profilePic} alt='' /> */}
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to={"/account"}>
                  <div className='image'>
                    <div className='img'>
                    <img src={user.profilePic === "" ? "log.png" : user.profilePic} alt='name' />
                    </div>
                    <div className='text'>
                      <h4>{user.username}</h4>
                      {/* <label>India</label> */}
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to={"/account"}>
                <button className='box'>
                  <IoSettingsOutline className='icon' />
                  <h4>My Account</h4>
                </button>
                </Link>
                {/* <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                <Link to={"/contact"}>
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                </Link>
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button><img src={"log.png"} alt='My Account' /></button>
          </Link>
        )}
      </div>
    </>
  )
}
