import moment from 'moment';

export const groupMessagesByDate = (messages) => {
  const groups = {};

  messages.forEach((msg) => {
    const dateKey = moment(msg.createdAt).format('MMMM D, YYYY'); // Exact format like March 7, 2023

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(msg);
  });

  return groups;
};
