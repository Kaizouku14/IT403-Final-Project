export enum pageRoutes {
	LOGIN = '/login',
	SIGNUP = '/signup',
	FORGOT_PASSWORD = '/forgot-password',
	DASHBOARD = '/dashboard',
	AUTH_LINK = '/auth-link/[shortCode]',
	FOLDER = '/folder/[folderId]/[slug]',
	LINK = `${FOLDER}/link/[linkId]`
}

export enum socialProviders {
	GOOGLE = 'google',
	ROBLOX = 'roblox'
}
