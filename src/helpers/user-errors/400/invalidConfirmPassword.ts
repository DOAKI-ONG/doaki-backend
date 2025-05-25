import { ApiError } from "@helpers/apiError";

export class InvalidConfirmPasswordError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Invalid confirm password";
        super(400, message);
    }
}