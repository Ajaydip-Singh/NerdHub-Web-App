export interface PesaPalOrderInfo {
  Amount: string;
  Description: string;
  Type: string;
  Reference: string;
  Email: string;
  FirstName: string;
  LastName: string;
  LineItems: [
    {
      UniqueId: string;
      Particulars: string;
      Quantity: string;
      Unitcost: string;
      Subtotal: string;
    }
  ];
}

export interface PesaPalOrderParameters {
  oauth_callback: string | undefined;
  oauth_consumer_key: string | undefined;
  oauth_nonce: string | undefined;
  oauth_signature_method: string | undefined;
  oauth_timestamp: number;
  oauth_version: string | undefined;
}
