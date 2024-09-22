export interface IEngineer {
  education: Education;
  verificationDocument: null;
  verifiedStatus: string;
  _id: string;
  user: User;
  title: string;
  overview: string;
  skills: any[];
  profilePic: string;
  submittedProposals: SubmittedProposal[];
  __v: number;
}

interface SubmittedProposal {
  service: string;
  _id: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Education {
  title: string;
  startDate: string;
  endDate: string;
}
