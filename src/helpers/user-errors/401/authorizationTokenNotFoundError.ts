import { ApiError } from "@helpers/apiError";

export class AuthorizationTokenNotFoundError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Authorization token not found";
        super(401, message);
    }
}