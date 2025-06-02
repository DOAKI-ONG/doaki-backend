import { ApiError } from "@helpers/apiError";

export class DonationRequestError extends ApiError {
    constructor(message?: string) {
        message = message ?? "Error: validation error for this body";
        super(400, message);
    }
}