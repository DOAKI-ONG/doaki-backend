export type PixPaymentBody = {
  body: {
    transaction_amount: number;
    description: string;
    payment_method_id: "pix";
    date_of_expiration: string;
    notification_url: string;
    payer: {
      email: string;
    };
  };
};

export type CardPaymentBody = {
  body: {
    transaction_amount: number;
    description: string;
    payment_method_id: string;
    date_of_expiration: string;
    notification_url: string;
    payer: {
      email: string;
      identification?: {
        type: string;
        number: string;
      };
    };
    installments: number;
    token: string;
  };
};
