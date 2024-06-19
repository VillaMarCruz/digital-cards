import { useState } from "react";
import Modal from "../Modal/Modal";
import estilos from "./Lightbox.module.css";

function Image({ images, hideLightBox }) {
  const [currentImage, setCurrentImage] = useState(0);
  const quantity = images?.length;

  const nextImage = () => {
    setCurrentImage(currentImage === quantity - 1 ? 0 : currentImage + 1);
  };

  const previousImage = () => {
    setCurrentImage(currentImage === 0 ? quantity - 1 : currentImage - 1);
  };

  const getImages = images.map((imagen, index) => {
    return (
      <div
        className={
          currentImage === index
            ? `${estilos.slide} ${estilos.active}`
            : estilos.slide
        }
      >
        {currentImage === index && (
          <img
            className="h-[40vh] md:h-[80vh] object-cover"
            key={imagen.alt}
            src={imagen.url}
            alt={imagen.alt}
          />
        )}
      </div>
    );
  });

  return (
    <>
      <Modal client:load hideModal={hideLightBox}>
        <div
          className={
            quantity === 1 ? "flex justify-center" : "flex justify-between"
          }
        >
          {quantity !== 1 && (
            <div className={estilos.previous} onClick={previousImage}>
              <img src="icons/previous.svg" alt="Icono anterior modal" />
            </div>
          )}
          <div className="flex flex-row justify-center items-center">
            {getImages}
          </div>
          {quantity !== 1 && (
            <div className={estilos.next} onClick={nextImage}>
              <img src="icons/next.svg" alt="Icono next modal" />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Image;
