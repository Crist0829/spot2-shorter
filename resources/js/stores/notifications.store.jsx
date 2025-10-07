import { create } from "zustand"



const useNotificationState = create(

  (set) => ({
    unReadNotification: [],
    qtUnReadNotification: 0,
    allNotification: [],

    updateUnReadNotification: (newUnReadNotifications) =>
      set(() => ({
        unReadNotification: newUnReadNotifications,
        qtUnReadNotification: newUnReadNotifications.length,
      })),

    updateAllNotification: (newAllNotifications) =>
      set(() => ({
        allNotification: newAllNotifications,
      })),

    updateNotification: (notificationId) =>
      set((state) => {
 
        const updatedUnRead = state.unReadNotification.filter(
          (notification) => notification.id !== notificationId
        )
 
        const updatedAll = state.allNotification.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() } 
            : notification
        )

        return {
          unReadNotification: updatedUnRead,
          qtUnReadNotification: updatedUnRead.length,
          allNotification: updatedAll,
        }
      }),
  })
)

export default useNotificationState
