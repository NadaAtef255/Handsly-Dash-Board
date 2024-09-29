export interface PendingUsers {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  verifiedStatus: string[];
  requestVerifiedStatus: boolean;
  gender: string;
  profilePic: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  docID: string;
}
