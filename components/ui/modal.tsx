"use client";

import { X } from "lucide-react";

type ModalProps = {
  open: boolean;

  onClose: () => void;

  title?: string;

  children: React.ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}

      <div
        className="
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-[1px]
        "
        onClick={onClose}
      />

      {/* MODAL */}

      <div
        className="
          fixed left-1/2 top-1/2 z-50
          w-full max-w-2xl
          -translate-x-1/2 -translate-y-1/2
          rounded-2xl border border-gray-200
          bg-white shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex items-center justify-between
            border-b border-gray-200
            px-6 py-4
          "
        >
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="
              rounded-lg p-2
              transition-colors
              hover:bg-gray-100
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}

        <div className="p-6">{children}</div>
      </div>
    </>
  );
}
