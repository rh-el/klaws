export interface LoginTypes {
	email: string;
	password: string;
}

export interface SignupTypes {
	email: string;
	nickname: string;
	bio?: string;
	avatar_url?: string;
	plain_password: string;
}
