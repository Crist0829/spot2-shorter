import { usePusherStore } from "@/stores/pusher.store"
import { SERVICE_WORKER_URL, VITE_APP_URL, PUSHER_BEAMS_INSTANCE_ID } from "../config/constants"
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import { useEffect } from "react"



function useRegisterServiceWorker({ auth }) {

  
    const existsBeamsClient = usePusherStore((state) => state.beamsClient) != null
    const setBeamsClient = usePusherStore((state) => state.setBeamsClient)
    useEffect(() => {
        if (existsBeamsClient) return

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register(SERVICE_WORKER_URL)
                .then((registration) => {
                    console.log("Service Worker registrado:", registration)
                    const beamsClient = new PusherPushNotifications.Client({
                        instanceId: PUSHER_BEAMS_INSTANCE_ID,
                        serviceWorkerRegistration: registration,
                    })

          
                    setBeamsClient(beamsClient)
        
                    beamsClient
                        .getUserId()
                        .then((userId) => {
                            if (userId !== auth.user.id.toString()) {
                                console.log("userId: " + userId)
                                console.log("auth.userId: " + auth.user.id.toString())
                                return beamsClient.stop()
                            }
                        })
                        .catch(console.error)

                    const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
                        url: VITE_APP_URL + "/api/pusher/beams-auth",
                        queryParams: { user_id: auth.user.id },
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${auth.user.notifications_token}`,
                        },
                    })

                    beamsClient
                        .start()
                        .then(() =>
                            beamsClient.setUserId(auth.user.id.toString(), beamsTokenProvider)
                        )
                        .then(() => {
                            console.log(
                                "Successfully registered and subscribed! " + auth.user.id
                            )
                        })
                        .catch(console.error)
                })

                .catch((error) => {
                    console.log("Error al registrar el Service Worker:", error)
                })
        }

    }, [auth])
}

export default useRegisterServiceWorker