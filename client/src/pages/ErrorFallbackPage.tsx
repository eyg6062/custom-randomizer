import { Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErrorFallbackPage() {
    return (
        <div style={{height: "24vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <IconExclamationCircle />
            <Text>An Error Has Occurred</Text>
        </div>
    )
}