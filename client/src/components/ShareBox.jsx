import React, { useContext, useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { AppContext } from '../context/AppContext'

const ShareBox = () => {
  const { setShare, share, selectedVideo } = useContext(AppContext)
  const [url, setUrl] = useState(window.location.href)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  useEffect(() => {
    setUrl(window.location.href)
  }, [window.location.href])

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  const openWhatsapp = () => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`${selectedVideo.title} ${url}`)}`;
    const link = document.createElement("a");
    link.href = whatsappLink;
    link.target = "_blank";
    link.click();
  };

  const openTwitter = () => {
    const twitterLink = `https://twitter.com/intent/tweet?text=${selectedVideo.title}:%20${url}`;
    window.open(twitterLink);
  }

  const openReddit = () => {
    const redditLink = `https://www.reddit.com/submit?title=${selectedVideo.title}!&url=${url}`;
    window.open(redditLink);
  }

  const openTelegram = () => {
    const telegramLink = `https://telegram.me/share/url?url=${url}&text=${selectedVideo.title}:`;
    window.open(telegramLink);
  }

    const openInstagram = () => {
      const shareUrl = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(selectedVideo.title)} ${encodeURIComponent(url)}`;
      window.open(shareUrl, "_blank");
    }

  return (
    <>
      <div className={share ? "rgba-container show-container more-index-high" : "rgba-container hide-container"}
        style={share ? { display: "flex", alignItems: "center", justifyContent: "center" } : null}>
        <div className="share-box">
          <IoClose style={{ fontSize: "33px", color: "#f1f1f1", position: "absolute", top: "3%", left: "3%", cursor: "pointer" }}
            onClick={() => setShare(false)} />
          <div className="url-here">
            <input type="text" value={url} readOnly />
            <span style={copied ? { right: "0%" } : { right: "2%" }} onClick={handleCopy}>{copied ? "Copied" : "Copy"}</span>
          </div>
          <div className="share-more-options">
            <img src="/whatsapp.png" alt="" onClick={openWhatsapp} />
            <img src="/twitter.png" alt="" onClick={openTwitter} />
            <img src="/reddit.webp" alt="" onClick={openReddit} />
            <img src="/telegram.png" alt="" onClick={openTelegram} />
            <img src="/instagram1.webp" alt="" onClick={openInstagram} style={{ objectFit: "cover", height: "65px", width: "65px" }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareBox