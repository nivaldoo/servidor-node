module.exports = (app) => {
  const controller = app.controllers.pessoa;
  app.post('/pessoa/add', controller.add);
  app.get('/pessoa/get/:id', controller.get);
  app.get('/pessoa/get-from-user/:id', controller.getFromUser);
  app.post('/pessoa/search', controller.search);
  app.delete('/pessoa/delete/:id', controller.delete);
  app.put('/pessoa/update', controller.update);
  app.post('/pessoa/searchReturnNames', controller.searchReturnNames);
  app.post('/pessoa/getCidade', controller.getCidade);
  app.post('/pessoa/searchReturnList', controller.searchReturnList);
  app.post('/pessoa/searchImportacao', controller.searchImportacao);
  app.post('/pessoa/searchTerm', controller.searchTerm);
};
