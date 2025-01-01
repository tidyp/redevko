// 카테고리 분류
const categoryFinder = (category) => {
  switch (category) {
    case "discuss":
      return "discuss";
    case "qna":
      return "questions";
    case "group":
      return "teams";
    case "event":
      return "calendars";
    case "articles":
      return "articles";
    default:
      return category;
  }
};

module.exports = categoryFinder;
