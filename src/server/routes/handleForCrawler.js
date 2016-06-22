const render = (req, res, next) => {
  const config = req.app.locals.di.config;
  const slug = req.params.slug;
  const url = `${config.baseURL}${req.url}`;

  req.app.locals.di.blogPostsRepository.getBySlug(slug)
    .then(blogPost => {
      if (blogPost === null) return res.status(404).send('Not Found');

      return res.render('for-crawler', {
        url,
        website: config.website,
        blogPost,
      });
    })
    .catch(err => {
      res.status(500).send('Internal Server Error');

      next(err);
    });
};

const handleForCrawler = (req, res, next) => {
  const ua = req.get('User-Agent');

  if (ua.includes('Twitterbot') || ua.includes('Facebot')) {
    return render(req, res);
  }

  return next();
};

export default handleForCrawler;
