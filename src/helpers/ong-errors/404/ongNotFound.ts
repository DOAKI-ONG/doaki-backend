import { ApiError } from "@helpers/apiError";
export class OngNotFoundError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: Ong not found";
        super(404, message);
    }
}