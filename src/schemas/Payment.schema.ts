import { z } from "zod";
export const newPayment = z.object({
  paymentData: z
    .object({
      token: z.string(),
      issuer_id: z.string(),
      payment_method_id: z.string(),
      transaction_amount: z.number(),
      installments: z.number(),
      payer: z.object({
        email: z.string(),
        identification: z.object({
          type: z.string(),
          number: z.string(),
        }),
      }),
    })
    .optional(),
});
