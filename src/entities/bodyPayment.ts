import { Ong, User } from "@prisma/client";
import { PaymentCreateData, PaymentCreateRequest } from "src/types/paymentBody.types";

export class BodyPayment implements PaymentCreateData {
  public notification_url: string = "https://example.com/notification";
  

  constructor(
    public readonly body: PaymentCreateRequest,
    public readonly user: User,
    public readonly ong: Ong
  ) {

    this.body.notification_url = this.notification_url;

    this.body.payer = {
      first_name: this.user.name.split(" ")[0],
      last_name: this.user.name.split(" ").slice(1).join(" "),
      email: this.user.email,
      identification: {
        type: "CPF",
        number: this.user.cpf!,
      },
    };

    this.body.additional_info = {
      items: [
        {
          id: this.ong.cnpj,
          title: this.ong.name,
          description: "Donation to " + this.ong.name,
          quantity: 1,
          unit_price: this.body.transaction_amount!,
        }
      ],
      payer: {
        first_name: this.user.name.split(" ")[0],
        last_name: this.user.name.split(" ").slice(1).join(" "),
        phone: {
          area_code: this.user.phone?.slice(0, 2) || "",
          number: this.user.phone?.slice(2) || "",
        },
      },
    };
  }
}
