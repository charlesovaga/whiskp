"use client"

import React from "react"
import styled from "styled-components"

interface BoxProps {
    css?: React.CSSProperties
}



const Box = styled.div.attrs<BoxProps>((props) => ({
    style: props.css, //Apply te css prop as inline styles
}))<BoxProps>`
box-sizing: border-box
`

export default Box