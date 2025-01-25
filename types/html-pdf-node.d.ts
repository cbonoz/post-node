declare module 'html-pdf-node' {
  interface Options {
    format?: string;
    width?: string;
    height?: string;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
  }

  interface FileContent {
    content?: string;
    url?: string;
  }

  function generatePdf(
    file: FileContent,
    options?: Options
  ): Promise<{ data: Buffer }>;

  export = {
    generatePdf
  };
}
