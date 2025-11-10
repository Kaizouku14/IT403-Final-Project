export const FOLDERS = ['Personal', 'Marketing', 'Development'] as const;
export type folderTypes = (typeof FOLDERS)[number];
