import { ApiError } from "@helpers/apiError";

export class PasswordRequiredError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Password is required";
        super(400, message);
    }
}