import africastalking from 'africastalking';

const africastalkingClient = africastalking({
  apiKey: process.env.AFRICAS_TALKING_API_KEY || '',
  username: process.env.AFRICAS_TALKING_USERNAME || 'sandbox',
});

const sms = africastalkingClient.SMS;

export async function sendOrderConfirmationSMS(phone: string, orderNumber: string, amount: number) {
  try {
    const message = `Hi! Your SmartMushroom order #${orderNumber} of KES ${amount} has been received. We'll notify you when ready for pickup. Thank you!`;
    
    const response = await sms.send({
      to: [phone],
      message: message,
      from: process.env.AFRICAS_TALKING_SENDER_ID || undefined,
    });
    
    return { success: true, response };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error };
  }
}

export async function sendPickupReadySMS(phone: string, orderNumber: string, pickupLocation: string) {
  try {
    const message = `Hi! Your SmartMushroom order #${orderNumber} is ready for pickup at ${pickupLocation}. Please bring ID for collection.`;
    
    const response = await sms.send({
      to: [phone],
      message: message,
      from: process.env.AFRICAS_TALKING_SENDER_ID || undefined,
    });
    
    return { success: true, response };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error };
  }
}

export async function sendAdminNewOrderSMS(phone: string, orderNumber: string, customerName: string, amount: number) {
  try {
    const message = `NEW ORDER #${orderNumber} from ${customerName} - KES ${amount}. Check admin dashboard.`;
    
    const response = await sms.send({
      to: [phone],
      message: message,
      from: process.env.AFRICAS_TALKING_SENDER_ID || undefined,
    });
    
    return { success: true, response };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error };
  }
}
