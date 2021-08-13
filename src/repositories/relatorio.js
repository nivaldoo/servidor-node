const excel = require('excel4node')
module.exports = (app) => {
  const repository = {
    getExcelReport: async (response) => {
      var obj = await app.db.models.Pessoa.findAll()
      var wb = new excel.Workbook()
      var ws = wb.addWorksheet('Afrobiz')
      var myStyle = wb.createStyle({
        font: {
          bold: true
        },
        alignment: {
          wrapText: true,
          horizontal: 'center',
        },
      });
      ws.cell(1, 1)
        .string('Nome').style(myStyle)
      ws.cell(1, 2)
        .string('E-mail').style(myStyle)
      obj.forEach((element, i) => {
        if (i > 0) {
          ws.cell(i + 1, 1)
            .string(element.nome)
          ws.cell(i + 1, 2)
            .string(element.email)
        }
      })
      wb.write(`Afrobiz${(new Date()).toLocaleDateString('pt-BR')}.xlsx`, response)
    },
    getPdfReport: async () => {

      try {

        var obj = await app.db.models.Pessoa.findAll()
        var qtdAtores = obj.length
        var tabela = obj.reduce((total, elemento) => {
          return total += `
                <tr>
                <td>${elemento.nome}</td>
                <td>${elemento.nome_fantasia}</td>
                <td>${elemento.cpf}</td>
                <td>${elemento.celular}</td>
                <td>${elemento.email}</td>
                <td>${elemento.bairro}</td>
                <td>12</td>
                <td>10</td>
              </tr>`
        }, '')
        var html = `            
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
<style type="text/css" media="all">
  html body {
    padding: 0;
    font-family: Arial !important;
    color: #444;
	font-size: 12px;
  }
	tbody td { 
		border-bottom: 1px solid #444;
	}

</style>

<style type="text/css" media="print">
/* ISO Paper Size */
@page {
  size: A4 landscape;
  margin: 0px; 
}
</style>

    <title>Relatorio Afrobiz</title>

</head>
<body>
<table width="100%" border="0" cellspacing="8" cellpadding="0">
    <tr>
      <td style="border-bottom: 0px solid transparent">
      <table width="100%" border="0" cellspacing="0" cellpadding="5">
    <tr>
      <td width="37%"><img src="data:image/png;base64,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" width="182" alt=""></td>
      <td width="63%" align="right"><h2 style="font-size: 2em;">Relatório de atores TEA</h2></td>
    </tr>
</table>
      </td>
    </tr>
    <tr>
    <td align="right" style="border-bottom: 0px !important">
      <span style="display: inline-block; margin-left: 15px;">Periodo do relatório: <strong>de 30/07/2021 a 06/08/2021</strong></span>
      <span style="display: inline-block; margin-left: 15px;">Total de atores TEA: <strong>${qtdAtores}</strong></span>
    </td>
    </tr>
    <tr>
      <td>
      <table width="100%" cellspacing="0" cellpadding="3">
        <thead>
          <tr>
            <th align="left" scope="col">Nome Completo</th>
            <th align="left" scope="col">Nome Fantasia</th>
            <th align="left" scope="col">CPF/CNPJ:</th>
            <th align="left" scope="col">Celular/Whatsapp:</th>
            <th align="left" scope="col">E-mail:</th>
            <th align="left" scope="col">Bairro:</th>
            <th align="left" scope="col">Quant. de produtos:</th>
            <th align="left" scope="col">Quant. de serviços:</th>
          </tr>
        </thead>
        <tbody>         
        ${tabela}
        </tbody>
      </table></td>
    </tr>
  </tbody>
</table>



</body>
</html>
`
        return await app.utils.puppeteer.createPdf(html, "treatments.pdf")

      } catch (error) {
        return error
      }
    }
  }
  return repository
}
