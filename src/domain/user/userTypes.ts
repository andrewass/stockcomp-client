export type UserPage = {
	entries: User[];
	totalEntriesCount: number;
};

export type User = {
	username: string;
	email: string;
	userRole: string;
	userStatus: string;
};
