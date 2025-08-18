import { useEffect, useState } from "react";
import { getImageUrl } from "../api/imageUpload"
import { Image } from "@mantine/core";

function About () {
    
    const [url, setUrl] = useState();

    useEffect( () => {
        const testKey = "f8d5e71d-9275-40ed-9090-e711aded15ef.png";
        getImageUrl(testKey)
            .then(json => setUrl(json.url))
    }
    , [])

    return (
        <>
            <h1>About</h1>
            <Image
                src={url}
                height={160}
                fit="contain"
            />
        </>
    )
}

export default About
