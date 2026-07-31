import type { ModalProps } from "./Modal.types";

const Modal = ({
  open,
  title,
  children,
  onClose,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-5xl rounded-lg bg-surface p-6 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-text-secondary"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;