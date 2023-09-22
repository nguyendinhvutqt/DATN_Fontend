export const getTotalLessons = (course) => {
  let totalLessons = 0;

  // Duyệt qua từng chương
  for (const chapter of course.chapters) {
    // Đếm số lượng bài học trong chương hiện tại
    totalLessons += chapter.lessons.length;
  }

  return totalLessons;
};

export const getTotalLessonsByUser = (course, userId) => {
  let totalLessons = 0;

  // Duyệt qua từng chương
  for (const chapter of course.chapters) {
    // Duyệt qua từng bài học trong chương hiện tại
    for (const lesson of chapter.lessons) {
      // Kiểm tra xem userId có trong mảng userLearneds của bài học không
      if (lesson.userLearneds.includes(userId)) {
        totalLessons++;
      }
    }
  }

  return totalLessons;
};

export const getPrtcentLessonSuccess = (course, userId) => {
  let totalLessons = 0;
  let totalLessonsSuccess = 0;

  // Duyệt qua từng chương
  for (const chapter of course.chapters) {
    // Duyệt qua từng bài học trong chương hiện tại
    totalLessons += chapter.lessons.length;
    for (const lesson of chapter.lessons) {
      // Kiểm tra xem userId có trong mảng userLearneds của bài học không
      if (lesson.userLearneds.includes(userId)) {
        totalLessonsSuccess++;
      }
    }
  }

  // Tính phần trăm và trả về
  return totalLessonsSuccess === 0
    ? 0
    : Math.floor((totalLessonsSuccess / totalLessons) * 100);
};
