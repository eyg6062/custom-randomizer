import { ReactElement } from "react";
import { useModal } from "./useModal";
import { ItemType, ModalProps } from "../types/modalProps";

export function useCustomModal<T extends ItemType = undefined, P = {}> (
    Component: (props: ModalProps<T> & P) => ReactElement,
    otherProps: P
) {
    const modal = useModal<T>();

    const modalNode = (
        <Component
            data={modal.data}
            opened={modal.opened}
            close={modal.close}
            {...otherProps}
        />
    )

    return {...modal, modalNode}
}
