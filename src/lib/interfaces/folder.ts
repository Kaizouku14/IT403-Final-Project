export interface Folder {
	id: string;
	folder: string;
	description: string | null;
	color: string | null;
	createdAt: Date;
	updatedAt: Date;
	noOfLinks: number;
}
