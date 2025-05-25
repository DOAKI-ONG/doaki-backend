import { ApiError } from "@helpers/apiError";

export class EmailRequiredError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Email is required";
        super(400, message);
    }
}