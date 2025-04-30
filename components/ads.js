import React, { useEffect } from 'react'

const Ad = () => {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4331473606799485"
      data-ad-slot="8120151682"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default Ad
