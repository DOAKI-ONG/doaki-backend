import { ApiError } from "@helpers/apiError";

export class InvalidEmailError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Invalid email";
        super(400, message);
    }
}