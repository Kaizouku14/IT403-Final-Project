export interface Folder {
	id: string;
	name: string;
	description: string | null;
	color: string;
	createdAt: Date;
	updatedAt: Date;
	noOfLinks: number;
}
