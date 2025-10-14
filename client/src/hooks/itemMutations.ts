import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { editDtoOverride } from "../Utils/dtoMapping";
import { showErrorNotification } from "../Utils/showNotifications";

function useEditMutation
<TData extends {id: string}, TDto>
(queryKey: string, single: boolean, putFn: (id: string, dto: TDto) => Promise<TData>, errorMsg: string = "failed to edit") :
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
        },
        onError: () => showErrorNotification(new Error(errorMsg))
    })
}

function useDeleteMutation
<TData extends {id: string}>
(queryKey: string, single: boolean, deleteFn: (id: string) => Promise<any>, errorMsg: string = "failed to delete") :
UseMutationResult<any, Error, { data: TData }, unknown> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({data}: { data: TData }) => deleteFn(data.id),
        onSuccess: (_, { data }) => {
            if (!single)
                queryClient.setQueryData<TData[]>([queryKey], (old = []) => 
                    old.filter((oldItem) => oldItem.id !== data.id)
            );
        },
        onError: () => showErrorNotification(new Error(errorMsg))
    })
}

function useCreateMutation
<T, TDto>
(queryKey: string, single: boolean, createFn: (createDto: TDto) => Promise<T>, errorMsg: string = "failed to create") :
UseMutationResult<any, Error, { dto: TDto }, unknown> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({dto}: { dto: TDto }) => createFn(dto),
        onSuccess: (response: T, { dto }) => {
            if (!single) {
                const newItem : T = editDtoOverride<T>(response, dto);
                queryClient.setQueryData<T[]>([queryKey], (old = []) => [...old, newItem])
            }
        },
        onError: () => showErrorNotification(new Error(errorMsg))
    })
}

export {useEditMutation, useDeleteMutation, useCreateMutation}