// src/app/interfaces/iclient.ts
export interface IClient {
  _id: string;
  user: User;
  overview: string;
  postedProjects: PostedProject[];
  activeContracts: string[]; // Array of contract IDs
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface PostedProject {
  service: string;
}
