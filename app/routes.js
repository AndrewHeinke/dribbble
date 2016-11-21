module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('pages/index.ejs');
  });
  app.get('/first', function(req, res) {
    res.render('pages/first.ejs');
  })
};
