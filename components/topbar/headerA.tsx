import React from 'react'

interface Props {
  children: React.ReactNode
  value: number
  index: number
  setValue: (index: number) => void
}
const HeaderA = React.forwardRef(
  ({ children, value, index, setValue }: Props, ref) => {
    return (
      <a
        onClick={() => setValue(index)}
        className={`flex cursor-pointer hover:text-indigo-600 transition duration-150 items-center gap-1 ${
          index === value && 'text-indigo-600'
        }`}
      >
        {children}
      </a>
    )
  }
)

export default HeaderA
