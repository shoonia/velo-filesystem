import type { languages } from 'monaco-editor';
import { createPageMap, getJsModels, getJsWorker, fileMatch } from './textModel';
import { getFrame } from './codeFrame';

interface IDiagnostic {
  readonly code: number;
  /** Diagnostic category: warning = 0, error = 1, suggestion = 2, message = 3 */
  readonly category: number;
  readonly codeFrame: string;
}

interface IDiagnosticReport {
  readonly fileName: string;
  readonly diagnostics: IDiagnostic[];
}

interface IDoDiagnostics {
  (): Promise<IDiagnosticReport[]>
}

interface IMapResult {
  (diagnostic: languages.typescript.Diagnostic): IDiagnostic;
}

const getPageName = createPageMap();

const createFileName = (path: string): string => {
  if (fileMatch.isPages(path)) {
    return getPageName(path);
  }

  else if (fileMatch.isMasterPage(path)) {
    return 'masterPage.js';
  }

  return path.slice(1);
};

export const doDiagnostics: IDoDiagnostics = async () => {
  const jsModels = getJsModels();
  const jsWorker = await getJsWorker();

  if (jsModels.length < 1 || typeof jsWorker !== 'function') {
    return [];
  }

  const tasks = jsModels.map(async (model) => {
    const modelWorker = await jsWorker(model.uri);
    const fileName = model.uri.toString();

    const [
      syntax,
      semantic,
      suggestion,
    ] = await Promise.all([
      modelWorker.getSyntacticDiagnostics(fileName),
      modelWorker.getSemanticDiagnostics(fileName),
      modelWorker.getSuggestionDiagnostics(fileName),
    ]);

    const diagnostics = [
      ...syntax,
      ...semantic,
      ...suggestion,
    ];

    const mapResult: IMapResult = (i) => {
      const rawLines = model.getValue();
      const start = model.getPositionAt(i.start ?? 0);
      const message = typeof i.messageText === 'string' ? i.messageText : '';

      return {
        code: i.code,
        category: i.category,
        codeFrame: getFrame(
          rawLines,
          { start },
          { message },
        ),
      };
    };

    return {
      fileName: createFileName(model.uri.path),
      diagnostics: diagnostics.map(mapResult),
    };
  });

  return Promise.all(tasks);
};
