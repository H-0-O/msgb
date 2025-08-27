
export function getErrorMessageOrDefault(error: unknown , defaultMessage?: string){
    
    if(error instanceof Error){
        return error.message;
    }

    return defaultMessage ?? "Unknown error happened"
}