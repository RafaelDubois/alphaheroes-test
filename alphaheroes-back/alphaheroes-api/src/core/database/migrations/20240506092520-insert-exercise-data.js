module.exports = {
  up: async (queryInterface) => {
    // Get the chapters
    const chapters = await queryInterface.sequelize.query(
      `SELECT id from "Chapters";`,
    );

    // Create 5 exercises for each chapter
    const exercises = chapters[0].flatMap((chapter) =>
      Array.from({ length: 5 }).map((_, index) => ({
        exercise_type: `Exercise Type ${index + 1}`,
        difficulty: index + 1,
        instructions: `Instructions for Exercise ${index + 1}`,
        completed: false,
        chapterId: chapter.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    // Insert exercises
    await queryInterface.bulkInsert('Exercises', exercises);
  },

  down: async (queryInterface) => {
    // Remove all exercises
    await queryInterface.bulkDelete('Exercises', null, {});
  },
};
