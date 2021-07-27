export declare global {
  interface Window {
    monaco?: typeof import('monaco-editor');
    siteHeader?: {
      pageIdList: {
        pages: {
          pageId: string;
          title: string;
          pageJsonFileName: string;
        }[]
      }
    }
  }
}
