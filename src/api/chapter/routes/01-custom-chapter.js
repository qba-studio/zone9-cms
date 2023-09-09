module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/chapters/:storySlug/:chapterNumber([0-9]+)',
      handler: 'chapter.detail',
      config: {
        auth: false,
      },
    },
  ],
};
