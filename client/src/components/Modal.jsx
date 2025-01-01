import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog className="modal rounded-lg bg-none p-4" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
};

export default Modal;
