import { AttachmentIcon, EditIcon, StarIcon, LinkIcon } from '@chakra-ui/icons';

import {
  POST,
  ANNOUNCEMENT,
  PERSONAL_SITE_BOOKMARKS,
  PORTFOLIO_BOOKMARKS,
  READING_BOOKMARKS,
} from './constants';

const isReadingBookmark = (type) => type === READING_BOOKMARKS;

const isPortfolioBookmark = (type) => type === PORTFOLIO_BOOKMARKS;

const isPersonalSiteBookmark = (type) => type === PERSONAL_SITE_BOOKMARKS;

export const getIcon = (type) => {
  if (isReadingBookmark(type)) return <EditIcon />;
  if (isPortfolioBookmark(type)) return <StarIcon />;
  if (isPersonalSiteBookmark(type)) return <LinkIcon />;
  return <AttachmentIcon />;
};
export const isActivePath = (currentPath, activePathColor, actualPath) => {
  return actualPath === currentPath ? activePathColor : 'none';
};

export const getActualPath = (pathname) => {
  const path = pathname.split('/');
  if (path.length > 0 && path[1] !== '')
    return (
      path[1].split('')[0].toUpperCase() + path[1].split('').splice(1).join('')
    );
  return 'Home';
};

export const getIconColor = (type) => {
  if (isReadingBookmark(type)) return '#3c3c40';
  if (isPortfolioBookmark(type)) return '#948459';
  if (isPersonalSiteBookmark(type)) return '#6d7d98';
};

export const getCurrentMonth = (currentMonth) => {
  var month = new Array();
  month[0] = 'January';
  month[1] = 'February';
  month[2] = 'March';
  month[3] = 'April';
  month[4] = 'May';
  month[5] = 'June';
  month[6] = 'July';
  month[7] = 'August';
  month[8] = 'September';
  month[9] = 'October';
  month[10] = 'November';
  month[11] = 'December';

  return month[currentMonth];
};

export const getMonthAndYearByDate = (currentDate) => {
  const date = new Date(currentDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthYearTitle = `${getCurrentMonth(month)}, ${year}`;

  return monthYearTitle;
};

export const sortDataByDate = (data) => {
  return data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const mapDataByMonth = (data) => {
  const months = [];
  const result = {};
  data.forEach((d) => {
    const month = new Date(d.date).getMonth();
    const year = new Date(d.date).getFullYear();
    const monthName = getCurrentMonth(month);

    if (!months.includes(month)) {
      months.push(month);
      result[monthName] = { month, year, monthData: [{ ...d }] };
    } else {
      const monthData = result[monthName].monthData.concat({ ...d });
      result[monthName] = { month, year, monthData };
    }
  });

  const sortedResult = sortData(result);

  console.log(sortedResult);
  console.log(result);

  return sortedResult;
};

const sortData = (data) => {
  const resultData = Object.entries(data);
  const sortedData = resultData.sort((a, b) => {
    const aMonth = a[1].month;
    const bMonth = b[1].month;
    return bMonth - aMonth;
  });

  sortedData.forEach((entry, index) => {
    const [, { monthData }] = entry;
    sortedData[index][1].monthData = monthData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  });

  return sortedData;
};

export const isLastElement = (array, index) => {
  return index < array.length - 1 || array.length === 1;
};

export const isPost = (type) => type === POST;

export const isAnnouncement = (type) => type === ANNOUNCEMENT;

export const getTimelineIcon = (type) => {
  if (isPost(type)) {
    return <EditIcon />;
  }
  if (isAnnouncement(type)) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <line x1="1.05" y1="12" x2="7" y2="12"></line>
        <line x1="17.01" y1="12" x2="22.96" y2="12"></line>
      </svg>
    );
  }
};
