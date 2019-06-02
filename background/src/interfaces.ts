import { IMessageContent } from "chrome-extension-messaging"

export type Callback = (
  error: Error | undefined,
  result?: IMessageContent
) => void
