interface Location {
  column: number,
  line: number,
}

interface NodeLocation {
  end: Location,
  start: Location,
}

const mock = (s: string): string => s;
function getDefs() {
  return {
    gutter: mock,
    marker: mock,
    message: mock,
  };
}

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

function getMarkerLines(
  loc: NodeLocation,
  source: Array<string>,
  opts?: Record<string, string | number>,
): { start: number, end: number, markerLines: Record<string, number[] | boolean> } {

  const startLoc: Location = loc.start;

  const endLoc: Location = {
    ...startLoc,
    ...loc.end,
  };

  const { linesAbove = 2, linesBelow = 3 } = opts || {};
  const startLine = startLoc.line;
  const startColumn = startLoc.column;
  const endLine = endLoc.line;
  const endColumn = endLoc.column;

  let start = Math.max(startLine - (+linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + +linesBelow);

  if (startLine === -1) {
    start = 0;
  }

  if (endLine === -1) {
    end = source.length;
  }

  const lineDiff = endLine - startLine;
  const markerLines: Record<string, number[] | boolean> = {};

  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine;

      if (!startColumn) {
        markerLines[lineNumber] = true;
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length;

        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn];
      } else {
        const sourceLength = source[lineNumber - i].length;

        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  } else {
    if (startColumn === endColumn) {
      if (startColumn) {
        markerLines[startLine] = [startColumn, 0];
      } else {
        markerLines[startLine] = true;
      }
    } else {
      markerLines[startLine] = [startColumn, endColumn - startColumn];
    }
  }

  return { start, end, markerLines };
}

export function codeFrameColumns(
  rawLines: string,
  loc: NodeLocation,
  opts?: Record<string, string | number>,
): string {
  const defs = getDefs();
  const maybeHighlight = (
    chalkFn: (s: string) => string,
    s: string,
  ): string => chalkFn(s);

  const lines = rawLines.split(NEWLINE);
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts);
  const hasColumns = loc.start && typeof loc.start.column === 'number';

  const numberMaxWidth = String(end).length;

  let frame = rawLines
    .split(NEWLINE)
    .slice(start, end)
    .map((line, index) => {
      const number = start + 1 + index;
      const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
      const gutter = ` ${paddedNumber} | `;
      const hasMarker = markerLines[number];
      const lastMarkerLine = !markerLines[number + 1];
      if (hasMarker) {
        let markerLine = '';
        if (Array.isArray(hasMarker)) {
          const markerSpacing = line
            .slice(0, Math.max(hasMarker[0] - 1, 0))
            .replace(/[^\t]/g, ' ');
          const numberOfMarkers = hasMarker[1] || 1;

          markerLine = [
            '\n ',
            maybeHighlight(defs.gutter, gutter.replace(/\d/g, ' ')),
            markerSpacing,
            maybeHighlight(defs.marker, '^').repeat(numberOfMarkers),
          ].join('');

          if (lastMarkerLine && opts?.message) {
            markerLine += ' ' + maybeHighlight(defs.message, String(opts?.message));
          }
        }
        return [
          maybeHighlight(defs.marker, '>'),
          maybeHighlight(defs.gutter, gutter),
          line,
          markerLine,
        ].join('');
      } else {
        return ` ${maybeHighlight(defs.gutter, gutter)}${line}`;
      }
    })
    .join('\n');

  if (opts?.message && !hasColumns) {
    frame = `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`;
  }


  return frame;
}

export function codeFrame (
  rawLines: string,
  lineNumber: number,
  colNumber = 0,
  opts?: Record<string, string | number>,
): string {
  colNumber = Math.max(+colNumber, 0);

  const location: NodeLocation = {
    start: { column: colNumber, line: lineNumber },
    end: { column: colNumber, line: lineNumber },
  };

  return codeFrameColumns(rawLines, location, opts);
}
