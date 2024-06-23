import { useEffect, useState } from "react";
import estilos from "./Carousel.module.css";

export default function Carousel({ images, autoplay = false }) {
  const quantity = images?.length; // CANTIDAD DE IMAGENES
  const imagesPerSlide = 2; // Establece el número de imágenes por slide

  const [selectedIndex, setSelectedIndex] = useState(0); // SELECTOR
  const [selectedImages, setSelectedImages] = useState([images[0], images[1]]);
  const [loaded, setLoaded] = useState(false); //CARGAR

  // [0,1,2,3,4]

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    const newIndex1 = next
      ? (index + (imagesPerSlide - 1)) % quantity
      : (index - (imagesPerSlide - 1) + quantity) % quantity; // next
    const newIndex2 = (newIndex1 + 1) % quantity; // previous

    setSelectedImages([images[newIndex1], images[newIndex2]]);
    setSelectedIndex(newIndex1);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, images);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedIndex, images, autoplay]);

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images, true);
  };

  return (
    <>
      <div
        className={
          quantity === 1 ? "flex justify-center" : "flex justify-between"
        }
      >
        {quantity !== 1 && (
          <div className={estilos.previous} onClick={previous}>
            <img src="icons/previous.svg" alt="Icono anterior modal" />
          </div>
        )}

        <div className="flex">
          {selectedImages.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={`h-[40vh] md:h-[60vh] w-[25vw] object-cover imagen-slide ${
                loaded ? "loaded" : ""
              }`}
              onLoad={() => setLoaded(true)}
            />
          ))}
        </div>

        {quantity !== 1 && (
          <div className={estilos.next} onClick={next}>
            <img src="icons/next.svg" alt="Icono next modal" />
          </div>
        )}
      </div>
    </>
  );
}
