const HeaderSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="before:transform-all text-xs md:text-sm relative lg:text-base font-medium capitalize tracking-wider before:absolute before:inset-x-0 before:-bottom-1.5 before:h-0.5 before:origin-left before:scale-x-0 before:rounded-bl before:bg-[#f9f9f9] before:transition-all before:duration-200 group-hover:before:scale-x-100">
      {children}
    </span>
  )
}

export default HeaderSpan
