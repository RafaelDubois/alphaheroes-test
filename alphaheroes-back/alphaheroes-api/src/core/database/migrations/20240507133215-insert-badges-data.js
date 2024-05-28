'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get the chapters
    const chaptersResult = await queryInterface.sequelize.query(
      `SELECT id from "Chapters";`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    // Insert badges with chapterId
    const badges = chaptersResult.map((chapter, index) => ({
      name: `Badge ${index + 1}`,
      image_url: `https://example.com/badge${index + 1}.png`, // Replace with actual image URL
      description: `Description for Badge ${index + 1}`,
      chapterId: chapter.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Badges', badges);
  },

  down: async (queryInterface) => {
    // Remove all badges
    await queryInterface.bulkDelete('Badges', null, {});
  },
};
