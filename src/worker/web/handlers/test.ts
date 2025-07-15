import {Context} from "hono";

export const testHandler = async (c: Context) => {
    const files = await c.env.TEST_BUCKET.list()
    const results = {
        successful: [] as string[],
        failed: [] as { key: string, error: string }[]
    }

    for (const f of files.objects) {
        const key = f.key

        try {
            const pdf = await c.env.TEST_BUCKET.get(key)

            const result = await c.env.AI.toMarkdown({
                name: key,
                blob: new Blob([await pdf.arrayBuffer()], {
                    type: "application/octet-stream",
                }),
            })

            const markdownContent = result.data
            console.log(`Successfully converted ${key} to markdown`)

            if (markdownContent) {
                // Transform the filename:
                // 1. Remove extension
                // 2. Convert to lowercase
                // 3. Replace spaces with underscores
                // 4. Add .md extension
                const nameWithoutExtension = key.replace(/\.[^/.]+$/, "")
                const transformedName = nameWithoutExtension
                    .toLowerCase()
                    .replace(/\s+/g, "_") + ".md"

                await c.env.TEST_BUCKET.put(transformedName, markdownContent)
                results.successful.push(key)
            }
        } catch (error) {
            console.error(`Failed to convert ${key}:`, error)
            results.failed.push({
                key,
                error: error instanceof Error ? error.message : String(error)
            })
            // Continue to next file instead of crashing
        }
    }

    return c.json({
        message: "Conversion complete",
        totalFiles: files.objects.length,
        successful: results.successful.length,
        failed: results.failed.length,
        successfulFiles: results.successful,
        failedFiles: results.failed
    })
}