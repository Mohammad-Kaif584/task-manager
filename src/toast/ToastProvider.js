import React, { useState, useContext, createContext } from 'react'
import Toaster from './Toaster'

const toastContext = createContext()
const useToast = () => useContext(toastContext)

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])
    const open = (text, color, Icon) => {
        const id = Date.now()
        setToasts([...toasts, { id, text, color, Icon }])
        setTimeout(() => close(id), 5000)
        return id
    }
    const close = (id) => setToasts(toasts => toasts.filter(toast => toast.id !== id))
    return (
        <toastContext.Provider value={{ open }}>
            {children}
            <div className='fixed space-y-2 bottom-4 right-4  z-[70]'>
                {toasts.map((item) => (
                    <Toaster close={close} id={item.id} color={item.color} Icon={item.Icon}>
                        {item.text}
                    </Toaster>
                ))}
            </div>
        </toastContext.Provider>
    )
}
export default ToastProvider
export { useToast }