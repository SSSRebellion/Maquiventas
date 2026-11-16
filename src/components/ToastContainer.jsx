import React from 'react';

export default function ToastContainer({ toasts, onCloseToast }) {
    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="toast-container" id="toast-container">
            {toasts.map(toast => (
                <div 
                    key={toast.id} 
                    className={`toast-notification toast-${toast.type || 'info'}`}
                >
                    <div className="toast-icon">
                        {toast.type === 'success' && '✔'}
                        {toast.type === 'error' && '✖'}
                        {toast.type === 'warning' && '⚠'}
                        {toast.type === 'info' && 'ℹ'}
                    </div>
                    <div className="toast-body">
                        {toast.title && <div className="toast-title">{toast.title}</div>}
                        <div className="toast-message">{toast.message}</div>
                    </div>
                    <button 
                        type="button" 
                        className="toast-close" 
                        onClick={() => onCloseToast(toast.id)}
                    >
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
}
