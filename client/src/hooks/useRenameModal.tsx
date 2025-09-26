import { useModal } from "./useModal";
import RenameModal from "../components/modals/RenameModal";
import { ItemType } from "../types/modalProps";

export function useRenameModal<T extends ItemType>() {
    const modal = useModal<T>();

    const modalNode = (handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => Promise<void>) => {
        return (
            <RenameModal
                data={modal.data as T}
                opened={modal.opened}
                close={modal.close}
                handleSubmit={handleSubmit}
            />
        );
    }

    return {...modal, modalNode}
}