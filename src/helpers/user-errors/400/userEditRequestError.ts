import { ApiError } from "@helpers/apiError";

export class UserEditRequestError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Error in user edit request";
        super(400, message);
    }
}