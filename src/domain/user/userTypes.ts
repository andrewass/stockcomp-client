export interface UserPage {
	entries: User[];
	totalEntriesCount: number;
}

export interface User {
	username: string;
	email: string;
	userRole: string;
	userStatus: string;
}
