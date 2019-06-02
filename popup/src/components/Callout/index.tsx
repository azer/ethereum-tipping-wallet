import React from "react"
import roka from "roka"

interface IProps {
  error?: string
  success?: string
}

const Callout = roka()
  .border({ around: "1px solid #ddd", radius: "3px" })
  .spacing({
    inner: "1rem",
    outerTop: "1rem",
    outerBottom: "1rem",
    column: "0.75rem"
  })
  .grid({ columns: "16px auto" })
  .bg({ color: "#fff" })
  .shadow(0.1)
  .element()

const Icon = roka().element()
const Message = roka()
  .sans({ size: "1rem", weight: "600", height: "1.3rem", color: "#222" })
  .cond((props: IProps) => !!props.error, roka().fg("#cc3340"))
  .element()

export default (props: IProps) => {
  return (
    <Callout {...props}>
      <Icon>{icon(props)}</Icon>
      <Message {...props}>{props.error || props.success}</Message>
    </Callout>
  )
}

function icon(options: IProps): JSX.Element | null {
  if (options.error) {
    return (
      <svg data-icon="error" viewBox="0 0 16 16" fill="rgb(236, 76, 71)">
        <path
          d="M7.99-.01c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-2h2v2zm0-3h-2v-7h2v7z"
          fill-rule="evenodd"
        />
      </svg>
    )
  }

  if (options.success) {
    return (
      <svg data-icon="tick-circle" viewBox="0 0 16 16" fill="rgb(71, 184, 129)">
        <path
          d="M8 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm4-11c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0 0 12 5z"
          fill-rule="evenodd"
        />
      </svg>
    )
  }

  return null
}
