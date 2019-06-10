import roka from "roka"

export const Header = roka()
  .absolute({ top: "0", left: "0" })
  .size({ width: "100%" })
  .mono({ size: "0.8rem", align: "center", uppercase: true })
  .spacing({ inner: "0.8rem" })
  .bg({ color: "#f2f2f2" })
  .fg("#999")
  .nooverflow()
  .element("header")

export const Profile = roka()
  .grid({ columns: "5rem auto" })
  .spacing({ columns: "0.5rem", outerBottom: "1rem" })
  .element("div")

export const ProfileText = roka()
  .nooverflow()
  .element("section")

export const ProfileTitle = roka()
  .fg("#333")
  .sans({ size: "1.4rem", weight: "600", height: "1.6rem", ellipsis: true })
  .spacing({ outer: "0" })
  .element("h1")

export const ProfileDesc = roka()
  .fg("#888")
  .sans({ size: "1.1rem", height: "1.3rem", weight: "400" })
  .spacing({ outer: "0.5rem 0 0 0" })
  .nooverflow()
  .element("h2")

export const Image = roka()
  .border({ around: "2px solid #007aff" })
  .spacing({ inner: "0.25rem" })
  .size({ width: "5rem", height: "5rem" })
  .round("100%")
  .cond(
    (props: { enabled: boolean }) => !props.enabled,
    roka().border({ around: "2px solid #ccc" })
  )
  .element("img")

export const Details = roka()
  .border({ top: "1px solid #eee" })
  .spacing({
    outerTop: "1rem",
    columns: "0.5rem",
    row: "0.75rem",
    innerTop: "1rem"
  })
  .set("display", "none")
  .sans({ size: "1rem", color: "#333" })
  .cond(
    ({ visible }: { visible: boolean }) => visible,
    roka().grid({ columns: "auto auto" })
  )
  .element("div")

export const DetailLabel = roka()
  .sans({ weight: "600" })
  .element()

export const DetailValue = roka().element()

export const CurrencyLabel = roka()
  .sans({ size: "1rem", color: "#999" })
  .absolute({ right: "1rem", top: "0.9rem" })
  .element()

export const Address = roka()
  .grid({ columns: "auto 3rem" })
  .spacing({ columns: "0.25rem" })
  .element()

export const AddressValue = roka()
  .sans({ color: "#333" })
  .nooverflow()
  .element()
