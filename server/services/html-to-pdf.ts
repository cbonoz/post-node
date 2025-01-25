import html_to_pdf from 'html-pdf-node';

export async function generatePdfBufferFromHtml(html: string): Promise<Buffer> {
  const options = {
    format: 'A4'
    // margin: {
    //   top: '0.5in',
    //   right: '0.5in',
    //   bottom: '0.5in',
    //   left: '0.5in'
    // }
  };

  const { data: buffer } = await html_to_pdf.generatePdf(
    { content: html },
    options
  );

  return buffer;
}
