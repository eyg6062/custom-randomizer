import { Loader } from "@mantine/core";

export function LoadingIndicator () {
    return (
        <div style={{height: "16vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Loader color="gray" />
        </div>
    )
}