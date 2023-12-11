
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

export interface DataCustomer {
  card_number: string;
  collector: string;
  first_name: string;
  address_3: string;
  address_4: string;
  home_zip_code: string;
  concat_customer: string;
}

export interface FileList {
  list_file: string;
}
