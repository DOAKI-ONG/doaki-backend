import { ApiError } from "@helpers/apiError";

export class WrongPasswordError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: The password is incorrect";
        super(400, message);
    }
}