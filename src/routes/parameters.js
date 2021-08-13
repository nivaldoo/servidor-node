module.exports = (app) => {
  const controller = app.controllers.parameters;
  app.get('/params/list', controller.list);
};
