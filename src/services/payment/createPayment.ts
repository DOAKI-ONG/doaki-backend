import {createPaymentClient} from '@lib/mercadopago';
import { PixPaymentBody } from 'src/types/paymentBody.types';

class PaymentService {
    /**
     * Creates a payment using the MercadoPago API.
     * @param {PixPaymentBody} data - The payment data to be sent to the API.
     * @returns {Promise<any>} - The response from the MercadoPago API.
     * @throws {Error} - Throws an error if the payment creation fails.
     */
  async createPixTransfer(data: PixPaymentBody) {
      const paymentData = await createPaymentClient;
      return paymentData;
  } 
  /**
     * Get a payment using the MercadoPago API and an ID.
     * @param {PixPaymentBody} data - The payment data to be sent to the API.
     * @returns {Promise<any>} - The response from the MercadoPago API.
     * @throws {Error} - Throws an error if the payment creation fails.
     */
  async getPayment(id: string) {
 
      const paymentData = await createPaymentClient;
      return paymentData;

  }
}