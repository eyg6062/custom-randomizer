import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { editDtoOverride } from "../Utils/dtoOverride";

function useEditMutation
<TData extends {id: string}, TDto>
(queryKey: string, single: boolean, putFn: (id: string, dto: TDto) => Promise<TData>) :
UseMutationResult<any, Error, { data: TData; editDto: TDto }, unknown> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data, editDto }: { data: TData; editDto: TDto }) => putFn(data.id, editDto),
        onSuccess: (_, { data, editDto }) => {
            if (single) {
                queryClient.setQueryData<TData>([queryKey], (old) => editDtoOverride(old, editDto))
            }
            else {
                queryClient.setQueryData<TData[]>([queryKey], (old = []) =>
                    old.map((oldItem) => oldItem.id === data.id ? editDtoOverride<TData>(oldItem, editDto) : oldItem));
            }
        }
    })
}

export {useEditMutation}