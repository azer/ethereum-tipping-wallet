import roka, { keyframes } from "roka"

const spin = keyframes`to { -webkit-transform: rotate(360deg); }`

export default roka()
  .inlineBlock()
  .size({ width: "20px", height: "20px" })
  .border({
    around: "3px solid rgba(255,255,255,.3)",
    top: "3px solid rgba(255,255,255)"
  })
  .round("50%")
  .animation(`${spin} 1s ease-in-out infinite`)
  .element()
