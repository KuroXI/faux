export interface Field {
  key: string;
  value: string;
  data?: string;
  count?: string;
  children?: Field[];
}

export interface Method {
  category: string;
  methods: string[];
}

export interface Template {
  name: string;
  fields: Field[];
}
