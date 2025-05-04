// components/Modal.tsx
'use client';
import React from 'react';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-transparent">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-black text-xl font-bold"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
