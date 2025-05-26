import { ApiError } from "@helpers/apiError";

export class UserRegisterRequestError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Error in user registration request";
        super(400, message);
    }
}