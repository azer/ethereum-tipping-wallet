import * as React from "react"
import { render } from "react-dom"
import Popup from "./Popup"

render(
  <React.Fragment>
    <Popup />
  </React.Fragment>,
  document.getElementById("root") as HTMLElement
)
