import { ApiError } from "@helpers/apiError";

export class CpfRequiredError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Cpf is required";
        super(400, message);
    }
}