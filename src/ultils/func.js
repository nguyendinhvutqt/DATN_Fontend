import moment from "moment";

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

export const getTimeComment = (time) => {
  // Thời gian cụ thể
  const specificTime = time;

  // Lấy thời gian hiện tại
  const currentTime = moment();

  // Chuyển đổi thời gian cụ thể sang định dạng Moment
  const specificMoment = moment(specificTime);

  // Tính khoảng cách thời gian
  const duration = moment.duration(currentTime.diff(specificMoment));

  // Xác định số ngày, tháng, năm, giờ, phút
  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Hiển thị theo ưu tiên: năm, tháng, ngày, giờ, phút
  let formattedTime = "";
  if (years > 0) {
    formattedTime = `${years} năm trước`;
  } else if (months > 0) {
    formattedTime = `${months} tháng trước`;
  } else if (days > 0) {
    formattedTime = `${days} ngày trước`;
  } else if (hours > 0) {
    formattedTime = `${hours} giờ trước`;
  } else if (minutes > 0) {
    formattedTime = `${minutes} phút trước`;
  } else {
    formattedTime = "Vài giây trước";
  }

  return formattedTime;
};
