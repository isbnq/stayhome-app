export type StorageMetadata = {
  bucket: string;
  generation: string;
  metageneration: string;
  fullPath: string;
  name: string;
  size: number;
  timeCreated: string;
  updated: string;

  md5Hash: string;
  cacheControl: string;
  contentDisposition: string;
  contentEncoding: string;
  contentLanguage: string;
  contentType: string;
  customMetadata: Record<string, string>;
}

export type StorageUploadableMetadata = Pick<StorageMetadata, 'md5Hash' | 'cacheControl' | 'contentDisposition' | 'contentEncoding' | 'contentLanguage' | 'contentType' | 'customMetadata'>

export type StorageUpdatableMetadata = Omit<StorageUploadableMetadata, 'md5Hash'>

export type StorageErrorResponse = {
  error: number,
  message: string
}