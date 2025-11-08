import type { InferSelectModel } from 'drizzle-orm';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: InferSelectModel<typeof schema.session>;
			user: InferSelectModel<typeof schema.user>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
