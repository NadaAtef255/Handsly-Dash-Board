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
  __v: number;
}
