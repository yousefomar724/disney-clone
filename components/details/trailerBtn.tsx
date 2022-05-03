const TrailerBtn = ({
  setShowTrailer,
}: {
  setShowTrailer: (showTrailer: boolean) => void
}) => {
  return (
    <button
      className="text-sm bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-1 px-4 rounded"
      onClick={() => setShowTrailer(true)}
    >
      <img src="/images/play-icon-white.svg" alt="play icon" className="h-6" />
      <span className="uppercase font-medium tracking-wide">Trailer</span>
    </button>
  )
}

export default TrailerBtn
