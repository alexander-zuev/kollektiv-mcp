import type {DocumentChunk} from "@/api-client/types/ragTasks";

// DocumentChunk factory
export const chunkFactory = (overrides: Partial<DocumentChunk> = {}): DocumentChunk => ({
    documentFilename: "test_document.pdf",
    title: "Document Title",
    section: 1,
    text: "This is the text of the document.",
    relevanceScore: 0.9,
    ...overrides,
});