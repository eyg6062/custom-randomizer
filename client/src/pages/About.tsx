import { Button } from "@mantine/core"
import { useMutation } from "@tanstack/react-query";
import { LoadingIndicator } from "../components/LoadingIndicator";

function About () {

    const testMutations = useMutation({
        mutationFn: async () => {console.log("fn"); throw new Error("test error fn")},
    })

    return (
        <>
            <h1>About</h1>

            <Button onClick={() => testMutations.mutate()}>Error Test</Button>
            <LoadingIndicator/>
        </>
    )
}

export default About
