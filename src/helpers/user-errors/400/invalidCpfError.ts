import { ApiError } from "@helpers/apiError";

export class InvalidCpfError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: CPF is invalid or must be 11 digits";
        super(400, message);
    }
}