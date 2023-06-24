import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsCamera } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { AppContext } from '../context/AppContext'


const EditProfile = ({reFetch}) => {
    const { user, notification ,setOpenEditProfile,openEditProfile} = useContext(AppContext)
    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const [changesMade , setChangesMade] = useState(false)

    const [editProfile, setEditProfile] = useState({
        name: "",
        picture: "",
        banner: ""
    })
    const [picture , setPicture] = useState(null)
    const [banner , setBanner] = useState(null)
    const [name , setName] = useState(null)


    useEffect(() => {
        setEditProfile((oldCode) => {
            return { ...oldCode, ...user }
        })
    }, [])


    const handleProfilePicChange = (event) => {
        setChangesMade(true)
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setEditProfile((old) => {
                return { ...old, picture: reader.result }
            })
        };
        reader.onloadend = ()=> {
            setPicture(reader.result)
            console.log("picture is uploaded",reader.result)
        }
        reader.readAsDataURL(file);
    };

    const handleBannerChange = (e) => {
        setChangesMade(true)
    let file = e.target.files[0]
        if (!file) {
            return;
        }
        const reader = new FileReader()
        reader.onload = () => {
            setEditProfile((old) => {
                return { ...old, banner: reader.result }
            })
        }
        reader.onloadend = ()=> {
            setBanner(reader.result)
            console.log("banner is uploaded",reader.result)
        }
        reader.readAsDataURL(file)
    }

    const saveChanges = async (e) => {
        e.preventDefault()
        try {
         if(changesMade){
            setLoading(true)
            // const formData = new FormData(formRef.current);

            const data = {
              picture: picture !== null ? picture : editProfile.picture,
              banner:banner !== null ? banner : editProfile.banner,
              name: name !== null ? name : editProfile.name
            }

            const response = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/change/profile', {
                method: 'PUT',
                credentials: 'include',
                body:JSON.stringify(data),
                headers:{"Content-Type":"application/json"}
            })

            if (!response.ok) {
                setLoading(false)
            }
            setLoading(false)
            setOpenEditProfile(false)
            notification("Changes saved suggessfully")
            reFetch()
         }else{notification("No changes made")}
        } catch (error) {}
    };


    return (
        <div className={openEditProfile ? "rgba-container show-container more-index-high" : "rgba-container hide-container"}
            style={openEditProfile ? { display: "flex", alignItems: "center", justifyContent: "center" } : null}>
            <form action="" onSubmit={saveChanges}
                ref={formRef}
                encType="multipart/form-data"
                id="form_style"
                name="saveChanges" className='share-box'>

                <div className="banner-absolute">
                    <input type="file" id='banner' name='banner' onChange={handleBannerChange} style={{ display: "none" }} />
                    <label htmlFor="banner">
                        <div className="change-bbn-nn"><BsCamera className='highlight' /></div></label>
                    <img src={editProfile.banner} alt="" />
                </div>

                <IoClose style={{ fontSize: "33px", color: "#f1f1f1", position: "absolute", top: "3%", left: "3%", cursor: "pointer" }}
                    onClick={() => setOpenEditProfile(false)} />
                <div className="url-here">
                    <input type="file" id='picture' name='picture' onChange={handleProfilePicChange} style={{ display: "none" }} />

                    <label htmlFor="picture" style={{ position: "relative" }}>
                        <BsCamera className='highlight pro-ff-yt' />
                        <img src={editProfile.picture} alt="" style={{ height: "90px", width: "90px", borderRadius: "50%", marginBottom: "10px" }} />
                    </label>
<input type="text" className="pf-info-input" name='name' defaultValue={editProfile.name} onChange={(e)=>  {setChangesMade(true);setName(e.target.value)}} />
                    <input type="text" defaultValue={user.email} className="pf-info-input" readOnly />
                    <input type="text" defaultValue={"*********"} className="pf-info-input" />
                    <button className={changesMade ? "save-changes " : "save-changes disabled"} type='submit'>{loading ? "Working on it..." : "Save changes"}</button>
                </div>
            </form>
        </div>

    )
}

export default EditProfile