"use client";

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import ModalContainer from "./ModalContainer";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  secondaryAction,
  secondaryLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <ModalContainer>
      <div
        className={`translate duration-300 h-full ${
          showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
            <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute right-9">
              <IoMdClose size={24} />
            </button>
            <div className="text-lg font-semibold">{title}</div>
          </div>
          <div className="relative p-6 flex-auto">{body}</div>
          <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-row items-center gap-4 w-full">
              {secondaryAction && secondaryLabel && <Button label={secondaryLabel} onClick={secondaryAction} outline />}
              <Button label={actionLabel} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;
