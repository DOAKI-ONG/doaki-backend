import { ApiError } from "@helpers/apiError";

export class InvalidPasswordError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Invalid password";
        super(400, message);
    }
}