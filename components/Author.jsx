import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className="text-center relative bg-black rounded-lg p-12 mb-8 mt-20 bg-opacity-30">
      <div className="absolute left-0 right-0 -top-14">

        <Image
          unoptimized
          src={author.photo.url}
          height="100px"
          width="100px"
          className="rounded-full align-middle"
          alt={author.name} />
      </div>
      <h3 className="text-white text-xl font-semibold">{author.name}</h3>
      <p className="text-lg text-white">{author.bio}</p>
    </div>
  )
}

export default Author