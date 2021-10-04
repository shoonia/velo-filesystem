interface Location {
  column?: number,
  line?: number,
}

interface NodeLocation {
  start: Location,
  end?: Location,
}

interface IOptions {
  message?: string;
  linesAbove?: number;
  linesBelow?: number;
}

interface IMarkerLines {
  [key: number]: number[] | boolean;
}

interface IGetMarkerLines {
  (loc: NodeLocation, source: string[], options?: IOptions): {
    start: number;
    end: number;
    markerLines: IMarkerLines;
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
  const startLoc = {
    column: 0,
    line: -1,
    ...loc.start,
  };

  const endLoc = {
    ...startLoc,
    ...loc.end,
  };

  const { linesAbove = 2, linesBelow = 3 } = opts ?? {};
  const startLine = startLoc.line;
  const startColumn = startLoc.column;
  const endLine = endLoc.line;
  const endColumn = endLoc.column;

  let start = Math.max(startLine - (linesAbove + 1), 0);
  let end = Math.min(source.length, endLine + linesBelow);

  if (startLine === -1) {
    start = 0;
  }

  if (endLine === -1) {
    end = source.length;
  }

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
  const hasColumns = typeof loc.start?.column === 'number';

  const numberMaxWidth = String(end).length;

  let frame = rawLines
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
    frame = `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`;
  }

  return frame;
};

export const codeFrame: ICodeFrame = (rawLines, lineNumber, columnNumber = 0, opts) => {
  const location: NodeLocation = {
    start: {
      column: Math.max(+columnNumber, 0),
      line: lineNumber,
    },
  };

  return getFrame(rawLines, location, opts);
};
