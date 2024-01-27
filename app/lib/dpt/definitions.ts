
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

// data preview
export interface DataCustomer {
  card_number: string;
  nik: number;
  collector: string;
  first_name: string;
  address_3: string;
  address_4: string;
  home_zip_code: string;
  concat_customer: string;
}

// data Match
export interface locationProps {
  locationDPT: ItemProps[]
}

interface ItemProps {
  card_number: string;
  nik: string;
  first_name: string;
  address_3: string;
  address_4: string;
  home_zip_code: string;
  concat_customer: string;
  collector: string;
  nama: string;
  kelurahan: string;
  kecamatan: string;
  kodepos: number;
  ktp: string;
}
// end data Match

export interface FileList {
  list_file: string;
}
