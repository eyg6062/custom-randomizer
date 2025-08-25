import { useModal } from "./useModal";
import RenameModal from "../components/RenameModal";
import { ItemType } from "../types/itemType";

export function useRenameModal<T>() {
    const modal = useModal<T>();

    const modalNode = (handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => Promise<void>) => {
        return (
            <RenameModal
                props={modal.data as ItemType}
                opened={modal.opened}
                close={modal.close}
                handleSubmit={handleSubmit}
            />
        );
    }

    return {...modal, modalNode}
}