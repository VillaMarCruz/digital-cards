import { useState } from "react";
import "./Photo.css";
import Lightbox from "../Lightbox/Lightbox";

function Photo() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hideLightBox = () => {
    setIsLightboxOpen(false);
  };

  const photo = [
    {
      url: "foto-principal.jpg",
      alt: "Foto principal",
    },
  ];

  return (
    <>
      <img
        className="rounded-full cursor-pointer"
        src="foto-principal.jpg"
        alt="Foto_principal"
        width="125"
        onClick={() => setIsLightboxOpen(true)}
      />

      {isLightboxOpen && (
        <Lightbox
          client:visible
          images={photo}
          hideLightBox={hideLightBox}
          client:load
        />
      )}
    </>
  );
}

export default Photo;
