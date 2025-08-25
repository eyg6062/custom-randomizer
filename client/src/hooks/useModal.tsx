import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function useModal<T> () {
    const [opened, { open, close }] = useDisclosure(false);
    // data of the selected item
    const [data, setData] = useState<T>()

    const openWithData = (item: T) => {
        setData(item);
        open();
    }

    return {opened, open, close, data, openWithData}
}
