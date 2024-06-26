export interface Field {
  key: string;
  value: string;
  children?: Field[];
}

export interface Method {
  category: string;
  methods: string[];
}
