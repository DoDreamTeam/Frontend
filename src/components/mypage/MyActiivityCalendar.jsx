import React, { useEffect, useState } from 'react';
import ActivityCalendar from 'react-activity-calendar';
import GetUser from './GetUser';
import api from '../../api/api';

const MyActivityCalendar = ({ userId }) => {
  const { userData } = GetUser(userId);
  const [userName, setUserName] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userData) {
      setUserName(userData.userName);
      fetchUserAnswers();
    }
  }, [userData]);

  const fetchUserAnswers = async () => {
    try {
      const response = await api.get(`mypage/answers/${userId}`);
      const answers = response?.data || [];

      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);

      const activityData = [];
      const answerCountByDate = {};

      if (answers && answers.length > 0) {
        answers.forEach((answer) => {
          const date = new Date(answer.createdAt).toISOString().split('T')[0];
          if (
            date >= startDate.toISOString().split('T')[0] &&
            date <= endDate.toISOString().split('T')[0]
          ) {
            answerCountByDate[date] = (answerCountByDate[date] || 0) + 1;
          }
        });
      }

      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split('T')[0];
        const count = answerCountByDate[formattedDate] || 0;

        let level;
        if (count >= 1 && count <= 1) {
          level = 1;
        } else if (count >= 2 && count <= 4) {
          level = 2;
        } else if (count >= 5 && count <= 7) {
          level = 3;
        } else if (count >= 8 && count <= 10) {
          level = 4;
        } else {
          level = 0;
        }

        activityData.push({
          count,
          date: formattedDate,
          level,
        });
      }

      setData(activityData);
    } catch (error) {
      console.error('Error fetching user answers:', error);

      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);

      const activityData = [];
      for (
        let date = startDate;
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split('T')[0];

        activityData.push({
          count: 0,
          date: formattedDate,
          level: 0,
        });
      }

      setData(activityData);
    }
  };

  const currentYear = new Date().getFullYear();
  const labels = {
    legend: {
      less: 'Less',
      more: 'More',
    },
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    totalCount: '{{count}} contributions in ' + currentYear,
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  if (data.length === 0) return <div>Loading data...</div>;

  const explicitTheme = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#383838', '#4D455D', '#7DB9B6', '#F5E9CF', '#E96479'],
  };

  return (
    <div>
      <div className="flex justify-between items mb-4">
        <div className="text-xl font-semibold mb-7">
          {userName} 님의 공부 내역
        </div>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ transform: 'scale(1.15)' }}
      >
        <ActivityCalendar data={data} labels={labels} theme={explicitTheme} />
      </div>
    </div>
  );
};

export default MyActivityCalendar;
