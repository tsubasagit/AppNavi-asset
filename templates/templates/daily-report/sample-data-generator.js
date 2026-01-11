/**
 * 日報チェックテンプレート用サンプルデータ生成スクリプト
 */

const submitters = ['山田太郎', '佐藤花子', '鈴木一郎', '高橋次郎', '田中三郎', '伊藤四郎', '渡辺五郎', '中村六郎'];
const checkers = ['管理者A', '管理者B', '管理者C'];
const activities = [
  '顧客訪問', '資料作成', '会議参加', 'システム開発', 'テスト実施',
  'コードレビュー', 'ドキュメント作成', '営業活動', 'マーケティング企画'
];
const results = [
  '新規顧客獲得', '資料完成', '会議で決定事項確認', '機能実装完了',
  'テスト完了', 'レビュー完了', 'ドキュメント完成', '商談進展'
];
const issues = [
  'スケジュール調整が必要', 'リソース不足', '技術的課題あり', '予算確認が必要',
  '承認待ち', '情報不足', '連絡待ち'
];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function randomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

function generateDailyReports() {
  const reports = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  let reportIndex = 1;
  
  // 各提出者に対して過去30日分の日報を生成
  for (const submitter of submitters) {
    for (let day = 0; day < 30; day++) {
      const reportDate = new Date(oneMonthAgo.getTime() + day * 24 * 60 * 60 * 1000);
      
      // 週末は生成しない（50%の確率で生成）
      if (reportDate.getDay() === 0 || reportDate.getDay() === 6) {
        if (Math.random() > 0.3) continue;
      }
      
      const status = Math.random() > 0.3 ? 
        (Math.random() > 0.5 ? '提出済み' : '承認済み') : '未提出';
      
      const submittedAt = status !== '未提出' ? 
        randomDate(reportDate, new Date(reportDate.getTime() + 24 * 60 * 60 * 1000)) : null;
      
      const checkedAt = status === '承認済み' && submittedAt ?
        randomDate(submittedAt, new Date(submittedAt.getTime() + 2 * 24 * 60 * 60 * 1000)) : null;
      
      const checker = status === '承認済み' ? 
        checkers[Math.floor(Math.random() * checkers.length)] : null;
      
      reports.push({
        id: `REP-${String(reportIndex).padStart(3, '0')}`,
        date: formatDate(reportDate),
        submitter: submitter,
        activities: `${activities[Math.floor(Math.random() * activities.length)]}、${activities[Math.floor(Math.random() * activities.length)]}`,
        results: Math.random() > 0.3 ? results[Math.floor(Math.random() * results.length)] : null,
        issues: Math.random() > 0.5 ? issues[Math.floor(Math.random() * issues.length)] : null,
        status: status,
        checker: checker,
        submittedAt: submittedAt ? submittedAt.toISOString() : null,
        checkedAt: checkedAt ? checkedAt.toISOString() : null,
        remarks: status === '承認済み' && Math.random() > 0.7 ? '問題なし。引き続き頑張ってください。' : null,
        createdAt: reportDate.toISOString(),
        updatedAt: (checkedAt || submittedAt || reportDate).toISOString()
      });
      reportIndex++;
    }
  }
  
  return reports;
}

function generateSampleData() {
  const reports = generateDailyReports();
  
  return {
    templateId: 'daily-report',
    version: '1.0.0',
    data: {
      daily_reports: reports
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
    console.log(`- 日報: ${data.data.daily_reports.length}件`);
  }
}
