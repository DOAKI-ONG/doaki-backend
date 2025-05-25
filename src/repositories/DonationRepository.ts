export default class DonationRepository {
    static async create(data: {
        id_user_fk: string;
        id_ong_fk: string;
        transaction_id: string;
        transaction_amount: number;
        transaction_status: string;
        transaction_type: string;
        payment_method_id: string;
        payment_method_type: string;
        card_brand: string;
        card_expiration_month: number;
        card_expiration_year: number;
        card_last_four_digits: string;
    }) {
        // Implement the logic to create a donation in the database
    }
}