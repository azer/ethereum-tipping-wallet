import * as React from "react"
import roka from "roka"

const DEFAULT_MULTILINE_HEIGHT = "5rem"

export interface IProps {
  value: string
  label?: string
  disabled?: boolean
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  autoFocus?: boolean
  clearButton?: boolean
  autocomplete?: boolean
  multiline?: boolean
  height?: string
  noresize?: boolean
  children?: JSX.Element | JSX.Element[]
  minimal?: boolean
}

const Container = roka()
  .cond((props: IProps) => !!props.label, roka().spacing({ innerTop: "23px" }))
  .element()

const TextField = roka()
  .relative()
  .border({ around: "1px solid #d6d6d6", radius: "5px" })
  .select(
    ":focus-within",
    roka()
      .border({ color: "#4285f4" })
      .set(
        "box-shadow",
        "rgba(67, 90, 111, 0.14) 0px 0px 2px inset, rgb(87, 154, 217) 0px 0px 0px 1px inset, rgba(16, 112, 202, 0.14) 0px 0px 0px 3px"
      )
  )
  .cond(
    (props: IProps) => props.minimal || false,
    roka()
      .spacing({ inner: "0", outer: "0" })
      .noborders()
  )
  .element()

const InputStyle = roka()
  .noborders()
  .nooutline()
  .stretch()
  .sans({ size: "1rem", color: "#111", height: "1.3" })
  .spacing({ inner: "0.8rem" })
  .border({ radius: "5px" })
  .select(":focus::-webkit-input-placeholder", roka().fg("#aaa"))
  .cond(
    (props: IProps) => props.disabled || false,
    roka()
      .bg({ color: "#f5f5f5" })
      .border({ color: "#eee" })
  )
  .cond(
    (props: IProps) => props.minimal || false,
    roka()
      .spacing({ inner: "0", outer: "0" })
      .noborders()
      .bg({ color: "transparent" })
  )

const Input = InputStyle.clone().element("input")
const Textarea = InputStyle.clone()
  .with((props: IProps) =>
    roka().size({ height: props.height || DEFAULT_MULTILINE_HEIGHT })
  )
  .cond(
    (props: IProps) => props.noresize || false,
    roka().set("resize", "none")
  )
  .element("textarea")

const Label = roka()
  .fg("#666")
  .absolute({ top: "-23px", left: "0" })
  .sans({ size: "1rem" })
  .easein(0.1)
  .element("label")

export default (props: IProps) => {
  return (
    <Container label={props.label}>
      <TextField label={props.label} minimal={props.minimal}>
        {props.multiline ? (
          <Textarea
            type={props.type || "text"}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled}
            noresize={props.noresize}
            minimal={props.minimal}
            onChange={props.onChange}
            autocomplete={
              props.autocomplete === false && props.type === "password"
                ? "new-password"
                : "on"
            }
          />
        ) : (
          <Input
            type={props.type || "text"}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            value={props.value}
            minimal={props.minimal}
            disabled={props.disabled}
            onChange={props.onChange}
            autocomplete={
              props.autocomplete === false && props.type === "password"
                ? "new-password"
                : "on"
            }
          />
        )}
        <Label {...props}>{props.label}</Label>
        {props.children}
      </TextField>
    </Container>
  )
}
