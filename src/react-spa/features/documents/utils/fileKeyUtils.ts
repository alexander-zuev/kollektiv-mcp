// helper that accepts either File or UserFile
export const makeFileKey = (o: {
  name?: string;
  size?: number;
  filename?: string;
  filesize?: number;
}): string => `${o.name ?? o.filename}::${o.size ?? o.filesize}`;