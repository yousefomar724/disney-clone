const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
      {children}
    </div>
  )
}

export default Main
