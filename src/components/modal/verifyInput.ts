export const verifyInput = (nameInput: string, value: string) =>{
    return !value ? {
        [nameInput]: {
            type: 'required',
            message: 'Es requerido',
        }
    } : {};
}