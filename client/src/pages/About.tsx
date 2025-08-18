import { useEffect, useState } from "react";
import { getImageUrl } from "../api/imageUpload"
import { Image } from "@mantine/core";

function About () {
    
    const [url, setUrl] = useState();

    useEffect( () => {
        const testKey = "6cca62b1-5029-4266-8b5b-1a0f1a4d3d16.png";
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
