
export interface DPTItem {
  card_number: number;
  collector: string;
  first_name: string;
  address_3: AddressDetails;
  address_4: AddressDetails;
  zip_code: number;
  kodepos: number;
  kelurahan: string;
  kecamatan: string;
}

interface AddressDetails {
  String: string;
  Valid: boolean;
}
