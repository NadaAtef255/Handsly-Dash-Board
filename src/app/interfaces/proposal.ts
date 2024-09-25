// src/app/interfaces/iproposal.ts
export interface IProposal {
  _id: string;
  engineer: string; // Engineer ID
  service: string; // Service ID
  content: string;
  budget: number;
}
