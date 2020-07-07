export interface DataRow {
  person_id: string;
  firstname: string;
  lastname: string;
  title: string;
  business_unit: string;
  is_user: boolean;
}

export interface MemberSetting {
  person_id: string;
  role: string;
  access_level: string;
}

export interface SaveRequest {
  members: MemberSetting[];
}

export interface Role {
  name: string;
  value: string;
}

export interface AccessLevel {
  name: string;
  value: string;
}
