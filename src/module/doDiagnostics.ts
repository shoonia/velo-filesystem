import type { languages } from 'monaco-editor';
import { getJsModels, getJsWorker } from './textModel';

interface IDiagnosticsResult {
  readonly path: string;
  readonly syntax: languages.typescript.Diagnostic[];
  readonly semantic: languages.typescript.Diagnostic[];
}

interface IDoDiagnostics {
  (): Promise<IDiagnosticsResult[]>
}

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
    ] = await Promise.all([
      modelWorker.getSyntacticDiagnostics(fileName),
      modelWorker.getSemanticDiagnostics(fileName),
    ]);

    return {
      path: model.uri.path,
      syntax,
      semantic,
    };
  });

  return Promise.all(tasks);
};
