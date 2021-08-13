var html_to_pdf = require('html-pdf-node');
module.exports = (app) => {
  const repository = app.repositories.parameters;
  return {
    async list(req, res) {
      try {
        //let options = { format: 'A4' };
        // Example of options with args //
        let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
        
        let file = { content: "<h1>Welcome to html-pdf-node</h1><p>isso é um texto de teste</p>" };
        
        html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
          res.end(pdfBuffer)
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  };
};
