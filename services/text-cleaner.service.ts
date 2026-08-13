export class TextCleanerService {
  clean(text: string): string {
    // 1. Normalize line endings: CRLF → LF (also handle lone CR).
    const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    const lines = normalized.split("\n");
    const cleanedLines: string[] = [];

    for (const line of lines) {
      // 2. Collapse excessive whitespace within the line.
      const collapsed = line.replace(/[ \t]+/g, " ").trim();

      // 5. Remove empty lines that contain only spaces or tabs.
      if (collapsed.length === 0) {
        if (line === "") {
          // Preserve genuinely blank lines (capped by rule 3 below).
          cleanedLines.push("");
        }
        continue;
      }

      cleanedLines.push(collapsed);
    }

    // 3. Collapse more than two consecutive blank lines to two.
    const finalLines: string[] = [];
    let blankRun = 0;

    for (const line of cleanedLines) {
      if (line === "") {
        blankRun += 1;
        if (blankRun <= 2) {
          finalLines.push("");
        }
      } else {
        blankRun = 0;
        finalLines.push(line);
      }
    }

    // 4. Trim leading/trailing whitespace.
    return finalLines.join("\n").trim();
  }
}

export const textCleanerService = new TextCleanerService();