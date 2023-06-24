import React, { useContext, useEffect, useRef, useState , Suspense } from 'react'
import { IoClose } from 'react-icons/io5'
import { BsCloudUploadFill } from 'react-icons/bs'
import { AppContext } from '../context/AppContext'
import ReactPlayer from 'react-player';

const UploadVideo = () => {
    const [tags, setTags] = useState([])
    const [previewUrl, setPreviewUrl] = useState(null);
    const [text, setText] = useState('');
    const [txt, setTxt] = useState("")
    const { setShowUpload, showUpload, notification, user } = useContext(AppContext)
    const formRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [upload, setUpload] = useState(true)
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [image , setImage] = useState()
    const [video,setVideo] = useState()
    const [selectedImage , setSelectedImage] = useState(null)



    const createTags = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setTags([...tags, txt])
            setTxt("")
        }
    }

    const uploadVideo = async (e) => {
        e.preventDefault()
        try {
            if (title && previewUrl && selectedFile && discription) {
                if (title.length < 100 && title.length > 0 && discription.length < 500 && discription.length > 1) {
                    if (upload) {
                        if(selectedFile?.size < 30258176 || selectedFile?.type !== "video/mp4"){
                            return notification("Validation failed, please check your inputs")
                        }
                        setLoading(true)

                        // const formData = new FormData(formRef.current);
                        // formData.append('tags', JSON.stringify(tags))

                        const data = {
                                title:title,
                                discription:discription,
                                thumbnail:image,
                                video:video,
                                tags:JSON.stringify(tags),
                        }

                        const response = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/upload', {
                            method: 'POST',
                            credentials: 'include',
                            body:JSON.stringify(data),
                            headers:{"Content-Type":"application/json"}
                        })

                        if (!response.ok) {
                            setLoading(false)
                            notification("Something went wrong, please try again later")
                            setUpload(false)
                        }else{
                            setUpload(false)
                            setLoading(false)
                            setShowUpload(false)
                            notification('Video uploaded successfully');
                        }
                       
                    }
                } else { notification("Validation failed, please check the inputs") }
            } else {
                notification("Please provide necessary information")
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        
        setSelectedImage(file)
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.onloadend = ()=> {
            setImage(reader.result)
        }
        reader.readAsDataURL(file);
    };

    const handleInputChange = (event) => {
        setDiscription(event.target.value)
        setText(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    const handleVideoUpload = (e) => {
        const file = e.target.files[0]
        if(!file){
            return;
        }
        setSelectedFile(file)
        const reader = new FileReader()
        reader.onloadend = ()=> {
            setVideo(reader.result)
        }
    reader.readAsDataURL(file)
    }


    return (
        <div className={showUpload ? "UploadVideo-rgb top-show" : "UploadVideo-rgb bottom-hide"}>
            <IoClose style={{ fontSize: "33px", color: "#f1f1f1", position: "absolute", top: "3%", left: "3%", cursor: "pointer" }}
                onClick={() => { setShowUpload(false); setPreviewUrl(null); setSelectedFile(null) }} />
            {loading ? <div className='uploading-container'><p>Uploading...</p>  <span className='loadingSpan'></span></div> : null}
            <form
                onSubmit={uploadVideo}
                ref={formRef}
                encType="multipart/form-data"
                id="form_style"
                name="uploadVideo" className='Upload-video-box '>
                <div className="video-preview-container">
                    <div className="video-demo-container" style={{ width: "100%" }}>
                            {/* <ReactPlayer
                            url={selectedFile !== null ? URL.createObjectURL(selectedFile) : "loading..."}
                            width='100%'
                        
                            height='auto'
                            controls={true}
                            muted={false} /> */}
                        <p style={{background:"#222222",fontSize:"1.3rem",padding:"20px",color:"#f1f1f1"}}>{selectedFile?.name}</p>
                        <div className="video-information" style={{ padding: "10px 10px 15px 10px" }} >
                            <img src={user.picture?.startsWith('https://') ?  user.picture : `https://youtube-clone-rx4q.onrender.com/public/${user.picture}`} alt="" style={{ marginRight: "8px" }} />
                            <div className="text-information" style={{ width: "100%", padding: "0px" }}>
                                {title !== "" ? <p className='title' >{title}</p> :
                                    <> <p className='loading-box' style={{ height: "10px", width: "100%" }}></p>
                                        <p className='loading-box' style={{ height: "10px", width: "70%", marginTop: "10px" }}></p></>
                                }

                            </div>
                        </div>
                    </div>
                    <input type="file" id='video' name='video' onChange={handleVideoUpload} style={{ display: "none" }} />
                    <label htmlFor="video" style={{ width: "100%", marginTop: "20px",marginBottom:"10px" }}>
                        <p className='select-video-btn'>Upload video</p></label>
                        {selectedFile?.type !== "video/mp4" && selectedFile !== null ? <p style={{ fontSize: "1.1rem", color: "red", marginTop: "10px" }}>Sorry, only mp4 files are allowed</p> : null}

                        { selectedFile === null ? null :  selectedFile?.size < 30258176  ? null : <p style={{ fontSize: "1.1rem", color: "red", marginTop: "10px" }}> File size too large, please select a file under 30MB</p>}

                </div>


                <div className="video-information-enter-here">
                    <input type="text" style={title.length > 100 ? { color: "red" } : null} placeholder='Enter video title' name='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                    {title.length > 100 ? <p style={{ fontSize: "1.1rem", color: "red", marginTop: "5px" }}>Title cannot exceed more 100 letters</p> : null}
                    <textarea name="discription" rows="5" cols="30" id='discription' placeholder='Enter video discription' onChange={handleInputChange} style={discription.length > 500 ? { color: "red" } : null} value={discription}></textarea>
                    {discription.length > 500 ? <p style={{ fontSize: "1.1rem", color: "red", marginTop: "5px" }}>Discription cannot exceed more 500 letters</p> : null}

                    <div className="tags-container">
                        {tags.map((tag) => {
                            return <p className='tag' style={tags.length > 10 ? { color: "red" } : null}>{tag}
                                <IoClose style={{ fontSize: "22px", color: "#f1f1f1", marginLeft: "8px" }}
                                    onClick={() => setTags(tags.filter((ta) => ta !== tag))} /></p>
                        })}

                    </div>
                    <input type="text" className='tags' placeholder='Enter video tags' onChange={(e) => setTxt(e.target.value)} value={txt}  onKeyDown={createTags} />
                    {tags.length > 10 ? <p style={{ fontSize: "1.1rem", color: "red", marginTop: "5px" }}>Only 10 tags are allowed</p> : null}

                    <input type="file" id="image" onChange={handleImageChange} name="thumbnail" placeholder='Select thumbnail'
                        style={{ display: "none" }} />
                    {previewUrl !== null ? <img src={previewUrl} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginTop: "20px", borderRadius: "10px" }} /> :  <img src={"https://www.cyberlink.com/prog/learning-center/html/4090/PDR19-YouTube-21_How_to_Name_Your_YouTube_Videos/img/No-Thumbnail.png"} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginTop: "20px", borderRadius: "10px" }} /> }

                    {selectedImage === null ? null : (selectedImage?.type !== "image/png" && selectedImage?.type !== "image/jpg" && selectedImage?.type !== "image/jpeg") ? <p style={{ fontSize: "1.1rem", color: "red", marginTop: "10px" }}>Sorry, only (PNG or JPG) are allowed</p> : null}

                    <label htmlFor="image" style={{ width: "100%", marginTop: "20px" }}><p className='select-video-btn'>Upload thumbnail</p></label>
                    <button type="submit" className='publish' onClick={() => setUpload(true)}>{loading ? "Uploading..." : "Publish"}</button>
                </div>



            </form>
            {/* </div>/ */}
        </div>
    )
}

export default UploadVideo