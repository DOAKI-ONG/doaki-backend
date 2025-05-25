import { ApiError } from "@helpers/apiError";

export class NameRequiredError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Name is required";
        super(400, message);
    }
}