import { notifications } from "@mantine/notifications"

export function showErrorNotification(error: any) {
    notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message,
        autoClose: 2000,
    })
}

export function showSavedNotification() {
    notifications.show({
        color: 'green',
        message: 'Saved!',
        autoClose: 2000,
    })
}