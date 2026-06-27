const LOGIC_START = ['capture("logic")'];
const LOGIC_END = ['capture("end logic")'];

function lineHasMarker(line: string, markers: string[]): boolean {
  return markers.some((marker) => line.includes(marker));
}

function extractLogicBlocks(source: string): string[] {
  const lines = source.split('\n');
  const blocks: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (!lineHasMarker(lines[i], LOGIC_START)) continue;

    const contentLines: string[] = [];
    for (let j = i + 1; j < lines.length; j++) {
      if (lineHasMarker(lines[j], LOGIC_END)) {
        const body = contentLines.join('\n').trim();
        if (body) blocks.push(body);
        break;
      }
      contentLines.push(lines[j]);
    }
  }

  return blocks;
}

function extractUiBlocks(source: string): string[] {
  const blocks: string[] = [];
  let searchFrom = 0;

  while (searchFrom < source.length) {
    const tagStart = source.indexOf('<Capture', searchFrom);
    if (tagStart === -1) break;

    const tagClose = source.indexOf('>', tagStart);
    if (tagClose === -1) break;

    const tag = source.slice(tagStart, tagClose + 1);
    if (!tag.includes('variant="ui"') && !tag.includes("variant='ui'")) {
      searchFrom = tagClose + 1;
      continue;
    }

    const contentStart = tagClose + 1;
    const contentEnd = source.indexOf('</Capture>', contentStart);
    if (contentEnd === -1) break;

    const body = source.slice(contentStart, contentEnd).trim();
    if (body) blocks.push(body);

    searchFrom = contentEnd + '</Capture>'.length;
  }

  return blocks;
}

export function extractCapturedSource(source: string): string {
  if (!source) return '';

  const logic = extractLogicBlocks(source);
  const ui = extractUiBlocks(source);
  const parts: string[] = [];

  if (logic.length) parts.push(logic.join('\n\n'));
  if (ui.length) parts.push(ui.join('\n\n'));

  return parts.join('\n\n');
}
