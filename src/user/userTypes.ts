export type UserExtended = {
  username: string;
  fullName: string;
  country: string;
};

export type User = {
  username: string;
  email: string;
  userRole: string;
  userStatus: string;
};

export type UserPage = {
  users: User[];
  totalEntriesCount: number;
};
