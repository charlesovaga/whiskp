
import React from 'react'
import TitleBorder from "apps/user-ui/src/assets/svgs/title-border";


function SectionTitle({title}: {title: string}) {
  return (
    <div className="relative">
      <h1 className="md:text-3xl text-xl relative z-10 font-semibold">{title}</h1>
        <TitleBorder  className="absolute top-[46%]"/>

    </div>
  )
}

export default SectionTitle
