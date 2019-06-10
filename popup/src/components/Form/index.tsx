import roka from "roka"

export default roka()
  .grid()
  .spacing({ row: "0.5rem" })
  .element()

export const Buttons = roka()
  .spacing({ top: "1rem" })
  .with(({ children }) =>
    roka()
      .grid({ columns: `repeat(${children.length}, 1fr)` })
      .spacing({ columns: "0.5rem" })
  )
  .element()
