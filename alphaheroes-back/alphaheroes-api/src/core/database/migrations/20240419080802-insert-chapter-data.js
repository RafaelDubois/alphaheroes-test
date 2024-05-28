'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Insert chapters
    const chapters = Array.from({ length: 5 }).map((_, index) => ({
      name: `Chapter ${index + 1}`,
      description: `This is the ${index + 1} chapter.`,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Chapters', chapters);
  },

  async down(queryInterface) {
    // Remove all chapters
    await queryInterface.bulkDelete('Chapters', null, {});
  },
};
