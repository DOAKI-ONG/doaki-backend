import { ApiError } from "@helpers/apiError";

export class UserInactiveError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: User are inactive";
        super(423, message);
    }
}