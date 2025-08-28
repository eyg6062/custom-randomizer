import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { ItemType } from "../types/modalProps";

export function useModal<T extends ItemType> () {
    const [opened, { open, close }] = useDisclosure(false);
    // data of the selected item
    const [data, setData] = useState<T>()

    const openWithData = (item: T) => {
        setData(item);
        open();
    }

    return {opened, open, close, data, openWithData}
}
