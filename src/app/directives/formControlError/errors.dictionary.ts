export const ErrorDictionary = {
    email: (value) => 'Debe ser un email válido',
    minlength: ({requiredLength}) => `Mínimo ${requiredLength} caracteres`,
    pattern: ({actualValue}) => {
        return [!/[0-9]/.test(actualValue) ?
            "Debe contener al menos un número" :
            null, 
        !/[A-Z]/.test(actualValue) ?
            "Debe contener al menos una mayúscula" :
            null
        ].filter(message => !!message).join("/n");
    },
    required:() => 'Este campo es requerido'
}