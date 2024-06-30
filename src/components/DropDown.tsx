import React, { FC, useEffect, useRef, useState } from 'react'
export interface IDropDownProps {
    selectedValue: string
    onChange: (val: string) => void
    options: string[]
}
const Dropdown: FC<IDropDownProps> = ({ onChange, selectedValue, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    const onChangeHandler = (val: string) => {
        onChange(val)
        setIsOpen(false)
    }
    return (
        <div className="relative w-fit " ref={dropdownRef}>
            <button
                className="text-white bg-gray-800 px-4 py-2 rounded-md focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValue}
            </button>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                    {options.map((product) => (
                        <div
                            onClick={() => onChangeHandler(product)}
                            key={product}
                            className="block px-4 py-2 text-white hover:bg-gray-700"
                        >
                            {product}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
