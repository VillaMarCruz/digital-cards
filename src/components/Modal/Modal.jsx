import "./Modal.css";

function Modal({ children, hideModal }) {
  return (
    <>
      <div className="modal">
        <div className="cerrar-modal" onClick={hideModal}>
          <img src="icons/cerrar.svg" alt="Icono cerrar modal" />
        </div>
        <div className="contenedor">{children}</div>
      </div>
    </>
  );
}

export default Modal;
