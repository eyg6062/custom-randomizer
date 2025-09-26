export function editDtoOverride<T>(original: T, dto: any) : T {
    return {
        ...original,
        ...Object.fromEntries(
            Object.entries(dto).filter(([_, value]) => value !== null && value !== undefined)
        )
    }
}