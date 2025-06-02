import { z } from "zod";
export const paymentSchema = z.object({
  paymentData: z
    .object({
      token: z.string().optional(),
      issuer_id: z.string().optional(),
      payment_method_id: z.string().min(1, "Payment method is required"),
      transaction_amount: z.number().min(1, "Transaction amount must be greater than 0"),
      installments: z.number().optional(),
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
