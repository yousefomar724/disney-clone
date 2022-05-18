const DetailsBtn = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  return (
    <div
      className="rounded-full border-2 outline-none border-white flex items-center justify-center w-8 h-8 cursor-pointer bg:black/60"
      title={title}
    >
      {children}
    </div>
  )
}

export default DetailsBtn
