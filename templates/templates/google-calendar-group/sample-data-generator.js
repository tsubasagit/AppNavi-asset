/**
 * Googleカレンダーのグループ化テンプレート用サンプルデータ生成スクリプト
 */

const groupNames = ['営業チーム', '開発チーム', 'マーケティングチーム', '管理部門'];
const calendarNames = [
  '営業部カレンダー', '開発部カレンダー', 'マーケティング部カレンダー',
  '管理部カレンダー', '全体会議', 'プロジェクトA', 'プロジェクトB'
];
const eventTitles = [
  '定例ミーティング', 'クライアント打ち合わせ', 'プロジェクトレビュー',
  'セミナー', '研修', '全体会議', '1on1', '進捗報告会'
];
const locations = [
  '会議室A', '会議室B', 'オンライン', '本社会議室', '支社会議室', 'カフェ'
];
const participants = [
  '山田太郎', '佐藤花子', '鈴木一郎', '高橋次郎', '田中三郎', '伊藤四郎'
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function randomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

function generateCalendarGroups() {
  const groups = [];
  const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];
  
  for (let i = 0; i < groupNames.length; i++) {
    const now = new Date();
    groups.push({
      id: `GROUP-${String(i + 1).padStart(3, '0')}`,
      name: groupNames[i],
      description: `${groupNames[i]}のカレンダーグループ`,
      color: colors[i % colors.length],
      isActive: true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    });
  }
  
  return groups;
}

function generateCalendars(groups) {
  const calendars = [];
  let calendarIndex = 1;
  
  for (const group of groups) {
    const calendarCount = Math.floor(Math.random() * 2) + 1; // 1-2個
        
    for (let j = 0; j < calendarCount; j++) {
      const now = new Date();
      calendars.push({
        id: `CAL-${String(calendarIndex).padStart(3, '0')}`,
        groupId: group.id,
        name: calendarNames[(calendarIndex - 1) % calendarNames.length],
        googleCalendarId: `google-cal-${calendarIndex}@gmail.com`,
        isActive: true,
        lastSyncAt: randomDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now).toISOString(),
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      });
      calendarIndex++;
    }
  }
  
  return calendars;
}

function generateEvents(calendars) {
  const events = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  let eventIndex = 1;
  
  for (const calendar of calendars) {
    const eventCount = Math.floor(Math.random() * 10) + 5; // 5-14個
        
    for (let j = 0; j < eventCount; j++) {
      const startDate = randomDate(oneMonthAgo, oneMonthLater);
      const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 3) + 1) * 60 * 60 * 1000); // 1-3時間後
      
      const participantCount = Math.floor(Math.random() * 3) + 1;
      const eventParticipants = [];
      for (let k = 0; k < participantCount; k++) {
        eventParticipants.push(participants[Math.floor(Math.random() * participants.length)]);
      }
      
      events.push({
        id: `EVT-${String(eventIndex).padStart(3, '0')}`,
        calendarId: calendar.id,
        title: eventTitles[Math.floor(Math.random() * eventTitles.length)],
        startDateTime: formatDateTime(startDate),
        endDateTime: formatDateTime(endDate),
        location: Math.random() > 0.5 ? locations[Math.floor(Math.random() * locations.length)] : null,
        participants: eventParticipants.join(', '),
        description: `${eventTitles[Math.floor(Math.random() * eventTitles.length)]}の詳細`,
        isAllDay: Math.random() > 0.9,
        googleEventId: `google-event-${eventIndex}`,
        createdAt: startDate.toISOString(),
        updatedAt: startDate.toISOString()
      });
      eventIndex++;
    }
  }
  
  return events;
}

function generateSampleData() {
  const groups = generateCalendarGroups();
  const calendars = generateCalendars(groups);
  const events = generateEvents(calendars);
  
  return {
    templateId: 'google-calendar-group',
    version: '1.0.0',
    data: {
      calendar_groups: groups,
      calendars: calendars,
      events: events
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateSampleData };
  
  if (require.main === module) {
    const fs = require('fs');
    const path = require('path');
    const data = generateSampleData();
    const outputPath = path.join(__dirname, 'sample-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`サンプルデータを生成しました: ${outputPath}`);
    console.log(`- グループ: ${data.data.calendar_groups.length}件`);
    console.log(`- カレンダー: ${data.data.calendars.length}件`);
    console.log(`- イベント: ${data.data.events.length}件`);
  }
}
