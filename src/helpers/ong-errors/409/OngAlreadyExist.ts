import { ApiError } from "@helpers/apiError";

export class OngAlreadyExistError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Ong already exists";
        super(409, message);
    }
}