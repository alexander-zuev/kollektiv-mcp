/**
 * Define allowed file types
 */

// Follows the format expected by accept of useDropzone
export const ALLOWED_FILE_TYPES = {
  // mime : [extension1, extension 2]
  'application/pdf': ['.pdf'],
  'application/vnd.oasis.opendocument.text': ['.odt'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/rtf': ['.rtf'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'text/plain': ['.txt'],
  'text/markdown': ['.md', '.markdown'],
  'text/x-markdown': ['.md', '.markdown'],
  'text/html': ['.html'],
  'application/lxml+xml': ['.xml'],
  'application/epub+zip': ['.epub'],
  'message/rfc822': ['.eml'],
};

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export const MAX_FILES_SELECTED_FOR_UPLOAD = 5;

// String for <input accept="...">: all extensions and mime types, comma-delimited, no spaces
export const ALLOWED_FILE_TYPES_STRING = [
  ...Object.values(ALLOWED_FILE_TYPES).flat(),
  ...Object.keys(ALLOWED_FILE_TYPES),
].join(',');
