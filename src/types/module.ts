export interface Module {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "blocked" | "" | string;
  createdDate: string;
  lastUpdated: string;
  clientCount?: number;

}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  lastUpdated: string;
}

export interface Message {
  id: string;
  clientId: string;
  clientName: string;
  senderType: "client" | "admin";
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface StatusOption {
  value: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
  textColor: string;
}
