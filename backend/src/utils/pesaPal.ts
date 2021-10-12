import { PesaPalOrderInfo } from '../interfaces/pesaPal';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import qs from 'qs';
import xmlbuilder from 'xmlbuilder';

export class PesaPalClient {
  public client_key = process.env.PESAPAL_CONSUMER_KEY;
  public client_secret = process.env.PESAPAL_CONSUMER_SECRET;
  public callback_url = process.env.CALLBACK_URL;

  public client = new OAuth({
    consumer: {
      key: this.client_key as string,
      secret: this.client_secret as string
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return crypto
        .createHmac('sha1', key)
        .update(base_string)
        .digest('base64');
    }
  });

  generateXml(parameters: PesaPalOrderInfo): string {
    const xml = xmlbuilder.create('PesapalDirectOrderInfo');

    for (const [k, v] of Object.entries(parameters)) {
      xml.att(k, v);
    }

    const rootAttrs = {
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
      xmlns: 'http://www.pesapal.com'
    };

    for (const [k, v] of Object.entries(rootAttrs)) {
      xml.att(k, v);
    }

    // line items
    if (parameters.LineItems) {
      const el = xml.ele('LineItems');
      parameters.LineItems.forEach(function (item) {
        el.ele('LineItem', item, '');
      });
    }

    return xml.end({ pretty: true });
  }

  async postDirectOrder(orderInfo: PesaPalOrderInfo): Promise<any> {
    const url = 'https://www.pesapal.com/API/PostPesapalDirectOrderV4';

    const requestData = {
      url,
      method: 'GET',
      data: {
        oauth_callback: this.callback_url,
        pesapal_request_data: this.generateXml(orderInfo)
      }
    };

    return url + '?' + qs.stringify(this.client.authorize(requestData));
  }

  queryPaymentStatusByMerchantRef(merchantReference: string): string {
    const url = 'https://www.pesapal.com/API/QueryPaymentStatusByMerchantRef';

    const requestData = {
      url,
      method: 'GET',
      data: {
        pesapal_merchant_reference: merchantReference
      }
    };

    return url + '?' + qs.stringify(this.client.authorize(requestData));
  }
}
