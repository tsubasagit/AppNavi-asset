/**
 * 自動連携テンプレート用サンプルデータ生成スクリプト
 */

const services = ['Google Calendar', 'Google Sheets', 'Slack', 'Microsoft Teams', 'Zoom', 'Notion', 'Trello', 'Asana'];
const syncIntervals = ['5分', '15分', '30分', '1時間', '6時間', '24時間', '手動'];
const statuses = ['有効', '無効', 'エラー'];
const statusWeights = [0.5, 0.3, 0.2];

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

function weightedRandom(items, weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  return items[items.length - 1];
}

function generateIntegrations() {
  const integrations = [];
  const now = new Date();
  
  for (let i = 0; i < services.length; i++) {
    const status = weightedRandom(statuses, statusWeights);
    const lastSyncAt = status === '有効' ? 
      randomDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now) : null;
    
    integrations.push({
      id: `INT-${String(i + 1).padStart(3, '0')}`,
      name: `${services[i]}連携`,
      service: services[i],
      status: status,
      lastSyncAt: lastSyncAt ? lastSyncAt.toISOString() : null,
      errorCount: status === 'エラー' ? Math.floor(Math.random() * 10) + 1 : 
                  Math.random() > 0.8 ? Math.floor(Math.random() * 3) : 0,
      settings: JSON.stringify({
        apiKey: `api-key-${i + 1}`,
        endpoint: `https://api.${services[i].toLowerCase().replace(/\s+/g, '')}.com`,
        enabled: status === '有効'
      }),
      syncInterval: syncIntervals[Math.floor(Math.random() * syncIntervals.length)],
      description: `${services[i]}との自動連携設定`,
      createdAt: randomDate(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000), now).toISOString(),
      updatedAt: (lastSyncAt || now).toISOString()
    });
  }
  
  return integrations;
}

function generateSyncLogs(integrations) {
  const logs = [];
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  let logIndex = 1;
  
  for (const integration of integrations) {
    if (integration.status === '無効') continue;
    
    const logCount = Math.floor(Math.random() * 20) + 10; // 10-29個
        
    for (let j = 0; j < logCount; j++) {
      const syncAt = randomDate(oneMonthAgo, now);
      const status = integration.status === 'エラー' && Math.random() > 0.3 ? 'エラー' :
                     Math.random() > 0.1 ? '成功' : '失敗';
      
      logs.push({
        id: `LOG-${String(logIndex).padStart(3, '0')}`,
        integrationId: integration.id,
        status: status,
        syncType: Math.random() > 0.8 ? '手動' : '自動',
        recordCount: status === '成功' ? Math.floor(Math.random() * 100) + 10 : null,
        errorMessage: status === 'エラー' || status === '失敗' ? 
          'API接続エラーが発生しました' : null,
        syncAt: syncAt.toISOString(),
        duration: status === '成功' ? Math.floor(Math.random() * 30) + 1 : null
      });
      logIndex++;
    }
  }
  
  // 日時でソート（最新が上）
  logs.sort((a, b) => new Date(b.syncAt) - new Date(a.syncAt));
  
  return logs;
}

function generateSampleData() {
  const integrations = generateIntegrations();
  const syncLogs = generateSyncLogs(integrations);
  
  return {
    templateId: 'auto-integration',
    version: '1.0.0',
    data: {
      integrations: integrations,
      sync_logs: syncLogs
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
    console.log(`- 連携: ${data.data.integrations.length}件`);
    console.log(`- 同期ログ: ${data.data.sync_logs.length}件`);
  }
}
