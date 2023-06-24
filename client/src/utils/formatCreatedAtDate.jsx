import moment from 'moment'

function formatCreatedAtDate(timestamp) {
  const now = moment();
  const createdAt = moment(timestamp);

  const diffInMinutes = now.diff(createdAt, "minutes");
  if (diffInMinutes < 60) {
    if (diffInMinutes <= 1) {
      return "1 minute ago";
    }
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = now.diff(createdAt, "hours");
  if (diffInHours < 24) {
    if (diffInHours <= 1) {
      return "1 hour ago";
    }
    return `${diffInHours} hours ago`;
  }

  const diffInDays = now.diff(createdAt, "days");
  if (diffInDays < 7) {
    if (diffInDays <= 1) {
      return "1 day ago";
    }
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = now.diff(createdAt, "weeks");
  if (diffInWeeks < 4) {
    if (diffInWeeks <= 1) {
      return "1 week ago";
    }
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = now.diff(createdAt, "months");
  if (diffInMonths < 12) {
    if (diffInMonths <= 1) {
      return "1 month ago";
    }
    return `${diffInMonths} months ago`;
  }

  const diffInYears = now.diff(createdAt, "years");
  if (diffInYears <= 1) {
    return "1 year ago";
  }
  return `${diffInYears} years ago`;
}

export default formatCreatedAtDate