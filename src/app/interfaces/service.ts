// src/app/interfaces/iservice.ts
export interface IService {
  _id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  client: string; // Client ID
  level: 'entry' | 'intermediate' | 'expert';
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  proposals: string[]; // Array of proposal IDs
  createdAt: Date;
  completedAt?: Date;
}
