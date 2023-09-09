'use strict';

/**
 * chapter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::chapter.chapter', ({ strapi }) => ({
  async detail(ctx) {
    const { storySlug, chapterNumber } = ctx.params;
    const formattedStorySlug = storySlug.trim();

    let entity = await strapi.db.query('api::chapter.chapter').findMany({
      filters: {
        chapterNumber,
        story: {
          slug: formattedStorySlug,
        },
      },
    });

    if (entity.length) {
      await strapi.db.query('api::chapter.chapter').updateMany({
        where: {
          id: entity.map((item) => item.id),
        },
        data: {
          viewCount: (entity?.[0].viewCount || 0) + 1,
        },
      });
    }

    const localeMapEntity = entity.reduce((prev, chapter) => {
      chapter.viewCount++;
      prev[chapter.locale] = this.transformResponse(chapter).data;

      return prev;
    }, {});

    return localeMapEntity;
  },
}));
