import React, { useEffect, useRef } from 'react'

interface VidListProps {
  vids: {
    name: string
    key: string
    type?: string
  }[]
}
const VidList = ({ vids }: VidListProps) => {
  const filteredVids = vids.length > 4 ? vids.slice(0, 4) : vids
  return (
    <div className="flex flex-col gap-8 my-12">
      {filteredVids.map((vid, index) => {
        return <Video key={index} vid={vid} />
      })}
    </div>
  )
}

interface VideoProps {
  vid: {
    name: string
    key: string
    type?: string
  }
}
const Video = ({ vid }: VideoProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const height = (iframeRef.current?.offsetWidth! * 9) / 16 + 'px'
    iframeRef.current?.setAttribute('height', height)
  }, [])

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl">
        {vid.name}
      </h2>
      <iframe
        src={`http://www.youtube.com/embed/${vid.key}`}
        ref={iframeRef}
        title={vid.name}
        width="100%"
      ></iframe>
    </div>
  )
}

export default VidList
