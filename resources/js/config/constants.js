export const APP_NAME = import.meta.env.VITE_APP_NAME 
export const VITE_APP_URL = import.meta.env.VITE_APP_URL || "http://localhost:8000"
export const SERVICE_WORKER_URL = import.meta.env.VITE_SERVICE_WORKER_URL
export const BASE_SHORT_URL = VITE_APP_URL + "/s/"
export const PUSHER_BEAMS_INSTANCE_ID = import.meta.env.VITE_PUSHER_BEAMS_INSTANCE_ID