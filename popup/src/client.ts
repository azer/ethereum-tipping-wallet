import { PopupClient } from "chrome-extension-messaging"

export const background = "tips:background"
export const content = "tips:content"

export default new PopupClient("tips")
