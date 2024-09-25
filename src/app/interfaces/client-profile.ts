// src/app/interfaces/client-profile.ts

export interface IClientProfile {
  _id: string;
  user: User;
  overview: string;
  postedProjects: PostedProject[];
  activeContracts: string[];
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

