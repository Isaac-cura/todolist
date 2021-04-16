export namespace IntermediaryModels{
    type ToastType = "success" | "error";

    export interface Toast {
        message: string;
        header?: string;
        type: ToastType;
        duration?: number;
        class?: string;
    }

    export type ToastMessage<T> = string | ((value:T) => string)
}