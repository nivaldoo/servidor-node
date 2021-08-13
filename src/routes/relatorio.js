module.exports = (app) => {
    const controller = app.controllers.relatorio
    app.get('/relatorio', controller.get)
    app.get('/relatorio/pdf', controller.pdf)
}
