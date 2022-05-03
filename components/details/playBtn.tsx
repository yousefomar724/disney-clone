const PlayBtn = () => {
  return (
    <button className="text-sm bg-[#f9f9f9] text-black flex items-center justify-center py-1 px-4 rounded hover:bg-[#c6c6c6]">
      <img src="/images/play-icon-black.svg" alt="play icon" className="h-6" />
      <span className="uppercase font-medium tracking-wide">Play</span>
    </button>
  )
}

export default PlayBtn
