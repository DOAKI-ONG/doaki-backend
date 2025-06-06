import MercadoPagoConfig from "mercadopago";
import { Address, Identification, Items, Phone, Shipments } from "mercadopago/dist/clients/commonTypes";
import { Payer } from "mercadopago/dist/clients/payment/commonTypes";
import { Options } from "mercadopago/dist/types";

export type PaymentCreateClient = {
    body: PaymentCreateRequest;
    config: MercadoPagoConfig;
};
export type PaymentCreateData = {
    body: PaymentCreateRequest;
    requestOptions?: Options;
};
export type PaymentCreateRequest = {
    additional_info?: AdditionalInfo;
    application_fee?: number;
    binary_mode?: boolean;
    callback_url?: string;
    campaign_id?: string;
    capture?: boolean;
    coupon_amount?: number;
    coupon_code?: string;
    date_of_expiration?: string;
    description?: string;
    differential_pricing_id?: number;
    external_reference?: string;
    installments?: number;
    issuer_id?: number;
    metadata?: any;
    notification_url?: string;
    payment_method_id?: string;
    payment_method?: PaymentMethod;
    statement_descriptor?: string;
    token?: string;
    transaction_amount?: number;
    three_d_secure_mode?: string;
    payer?: PayerRequest;
    forward_data?: ForwardDataRequest;
    point_of_interaction?: PointOfInteractionRequest;
    sponsor_id?: number;
    transaction_details?: TransactionDetailsRequest;
};
export  type PayerRequest = {
    type?: string;
    id?: string;
    email?: string;
    identification?: Identification;
    phone?: Phone;
    first_name?: string;
    last_name?: string;
    entity_type?: string;
    address?: AddressRequest;
};
export  type ForwardDataRequest = {
    sub_merchant?: SubMerchant;
    network_transaction_data?: NetworkTransactionData;
};
export  type NetworkTransactionData = {
    network_transaction_id?: string;
};
export  interface AddressRequest extends Address {
    neighborhood?: string;
    city?: string;
    federal_unit?: string;
}
export type SubMerchant = {
    sub_merchant_id?: string;
    mcc?: string;
    country?: string;
    address_door_number?: number;
    zip?: string;
    document_number?: string;
    city?: string;
    address_street?: string;
    business_name?: string;
    region_code_iso?: string;
    region_code?: string;
    document_type?: string;
    phone?: string;
    url?: string;
    legal_name?: string;
};
export  type PointOfInteractionRequest = {
    linkedTo?: string;
    type?: string;
    sub_type?: string;
    transaction_data?: TransactionDataRequest;
};
export  type TransactionDataRequest = {
    first_time_use?: boolean;
    subscription_sequence?: SubscriptionSequenceRequest;
    subscription_id?: string;
    invoice_period?: InvoicePeriodRequest;
    payment_reference?: PaymentReferenceRequest;
    billing_date?: string;
};
export  type SubscriptionSequenceRequest = {
    number?: number;
    total?: number;
};
export  type InvoicePeriodRequest = {
    period?: number;
    type?: string;
};
export  type PaymentReferenceRequest = {
    id?: string;
};
export type AdditionalInfo = {
    ip_address?: string;
    items?: Array<Items>;
    payer?: Payer;
    shipments?: Shipments;
};
export type PaymentMethod = {
    data?: PaymentMethodData;
    type?: string;
};
export type PaymentMethodData = {
    authentication?: PaymentMethodDataAuthentication;
};
export type PaymentMethodDataAuthentication = {
    acs_trans_id?: string;
    authentication_status?: string;
    cryptogram?: string;
    ds_trans_id?: string;
    eci?: string;
    three_ds_server_trans_id?: string;
    three_ds_version?: string;
    type?: string;
};
export type TransactionDetailsRequest = {
    financial_institution?: string;
};
