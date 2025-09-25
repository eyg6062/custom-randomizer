import { Center, Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErrorFallbackPage() {
    return (
        <Center>
            <IconExclamationCircle />
            <Text>An Error Has Occurred</Text>
        </Center>
    )
}