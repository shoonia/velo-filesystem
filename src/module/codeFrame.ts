interface Location {
  readonly column?: number,
  readonly lineNumber?: number,
}

interface NodeLocation {
  readonly start: Location,
  readonly end?: Location,
}

interface IOptions {
  readonly message?: string;
  readonly linesAbove?: number;
  readonly linesBelow?: number;
}

interface IMarkerLines {
  [key: number]: number[] | boolean;
}

interface IGetMarkerLines {
  (loc: NodeLocation, source: string[], options?: IOptions): {
    readonly start: number;
    readonly end: number;
    readonly markerLines: IMarkerLines;
  }
}

interface IGetCodeFrame {
  (rawLines: string, loc: NodeLocation, opts?: IOptions): string;
}

interface ICodeFrame {
  (rawLines: string, lineNumber: number, columnNumber?: number, opts?: IOptions): string;
}

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;

const getMarkerLines: IGetMarkerLines = (loc, source, opts) => {
  const linesAbove = opts?.linesAbove ?? 2;
  const linesBelow = opts?.linesBelow ?? 3;

  const startLine = loc.start.lineNumber ?? -1;
  const startColumn = loc.start.column ?? 0;

  const endLine = loc.end?.lineNumber ?? startLine;
  const endColumn = loc.end?.column ?? startColumn;

  const start = (startLine === -1)
    ? 0
    : Math.max(startLine - (linesAbove + 1), 0);

  const end = (endLine === -1)
    ? source.length
    : Math.min(source.length, endLine + linesBelow);

  const lineDiff = endLine - startLine;
  const markerLines: IMarkerLines = {};

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
};

export const getFrame: IGetCodeFrame = (rawLines, loc, opts) => {
  const lines = rawLines.split(NEWLINE);
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts);
  const hasColumns = typeof loc.start.column === 'number';

  const numberMaxWidth = String(end).length;

  const frame = rawLines
    .split(NEWLINE, end)
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
          const numberOfMarkers = hasMarker[1] || 1;
          const markerSpacing = line
            .slice(0, Math.max(hasMarker[0] - 1, 0))
            .replace(/[^\t]/g, ' ');

          markerLine =
            `\n ${gutter.replace(/\d/g, ' ')}${markerSpacing}${'^'.repeat(numberOfMarkers)}`;

          if (lastMarkerLine && opts?.message) {
            markerLine += ` ${opts.message}`;
          }
        }

        return `>${gutter}${line}${markerLine}`;
      }

      return ` ${gutter}${line}`;
    })
    .join('\n');

  if (opts?.message && !hasColumns) {
    return `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`;
  }

  return frame;
};

export const codeFrame: ICodeFrame = (rawLines, lineNumber, columnNumber = 0, opts) => {
  const location: NodeLocation = {
    start: {
      column: Math.max(columnNumber, 0),
      lineNumber,
    },
  };

  return getFrame(rawLines, location, opts);
};
