import React from 'react'
export default function Input(props) {
    const { Icon } = props
    return (
        <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center pl-10 pointer-events-none">
                {Icon}
            </div>
            <input {...props} className='input2' />
        </div>
    )
}
