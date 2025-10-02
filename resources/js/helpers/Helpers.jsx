import { JSXElementConstructor, ReactElement, ReactNode } from "react"
import { toast } from "sonner"

//Muestra el mensaje flash enviado
export const getFlashAvailableMessage = (flash) => {
    const flashMessages = Object.keys(flash)
    let messageToShow = null
    let error = false
  
    flashMessages.forEach((msg) => {
      if (messageToShow != null) return true
      const msgToShow = msg.split("_").find((e) => e == "not")
      error = msgToShow != undefined ? true : false
      messageToShow = flash[msg] != null ? flash[msg] : null
    })
  
    if (messageToShow != null) {
      if (error) {
        toast.error("Error", {
          description: messageToShow,
          duration: 3000,
          closeButton: true,
        })
      } else {
        toast.success(messageToShow, {
          duration: 3000,
          closeButton: true,
        })
      }
    }
  }