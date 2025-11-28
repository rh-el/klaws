export interface LoginTypes {
	email: string;
	password: string;
}

export interface SignupTypes {
	email: string;
	username: string;
	bio?: string;
	avatar_url?: string;
	plain_password: string;
}

export interface AccountTypes {
	username: string;
	bio?: string;
	avatar_url?: string;
}
