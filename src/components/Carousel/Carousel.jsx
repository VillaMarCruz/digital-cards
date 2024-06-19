import { useEffect, useState } from "react";
import estilos from "./Carousel.module.css";

export default function Carousel({ images, autoplay = false }) {
  const quantity = images?.length;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    const condition = next ? index < quantity - 1 : index > 0;
    const nextIndex = next
      ? condition
        ? index + 1
        : 0
      : condition
      ? index - 1
      : quantity - 1;

    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        selectNewImage(selectedImage, images);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

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
        <img
          src={selectedImage.url}
          alt="Imagen seleccionada"
          className={`h-[40vh] md:h-[60vh] object-cover imagen-slide  ${
            loaded ? "loaded" : ""
          }`}
          onLoad={() => setLoaded(true)}
        />

        {quantity !== 1 && (
          <div className={estilos.next} onClick={next}>
            <img src="icons/next.svg" alt="Icono next modal" />
          </div>
        )}
      </div>
    </>
  );
}
