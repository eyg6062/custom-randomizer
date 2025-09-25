import { notifications } from "@mantine/notifications"

export function showErrorNotification(error: any) {
    notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message,
        autoClose: 1500,
    })
}