/**
 * CRMテンプレート用サンプルデータ生成スクリプト
 * 仕様書に基づいて、リアリティのあるサンプルデータを生成
 */

// 会社名のサンプル
const companyNames = [
  '株式会社サンプル', '株式会社テクノロジー', '株式会社ビジネスソリューション',
  '株式会社システム開発', '株式会社データ分析', '株式会社クラウドサービス',
  '株式会社デジタルマーケティング', '株式会社ITコンサルティング', '株式会社ソフトウェア開発',
  '株式会社ウェブ制作', '株式会社モバイルアプリ', '株式会社AIソリューション',
  '株式会社セキュリティ', '株式会社ネットワーク', '株式会社インフラ構築',
  '株式会社システム運用', '株式会社データベース', '株式会社API開発',
  '株式会社マイクロサービス', '株式会社DevOps', '株式会社フルスタック',
  '株式会社フロントエンド', '株式会社バックエンド', '株式会社フルサイクル',
  '株式会社アジャイル', '株式会社スクラム', '株式会社リーン',
  '株式会社デザイン思考', '株式会社UXデザイン', '株式会社UIデザイン'
];

// 部署名のサンプル
const departments = [
  '営業部', 'マーケティング部', '開発部', '技術部', '企画部',
  '経営企画部', '人事部', '総務部', '財務部', '法務部'
];

// 役職のサンプル
const positions = [
  '代表取締役', '専務取締役', '常務取締役', '取締役', '部長',
  '次長', '課長', '係長', '主任', '一般社員'
];

// 担当者名のサンプル
const assignees = [
  '佐藤花子', '鈴木一郎', '高橋次郎', '田中三郎', '伊藤四郎',
  '渡辺五郎', '中村六郎', '小林七郎', '加藤八郎', '吉田九郎'
];

// 業種のサンプル
const industries = [
  'IT・ソフトウェア', '製造業', '小売・卸売', 'サービス業',
  '建設・不動産', '金融・保険', '医療・福祉', '教育', 'その他'
];

// 都道府県のサンプル
const prefectures = [
  '東京都', '神奈川県', '埼玉県', '千葉県', '大阪府',
  '京都府', '兵庫県', '愛知県', '福岡県', '北海道'
];

// 市区町村のサンプル
const cities = [
  '千代田区', '中央区', '港区', '新宿区', '渋谷区',
  '品川区', '目黒区', '大田区', '世田谷区', '杉並区'
];

// 活動タイトルのサンプル
const activityTitles = [
  '初回ヒアリング', '要件確認', '提案書送付', '見積書提出',
  'デモンストレーション', '契約条件の調整', '最終確認', '契約締結',
  'フォローアップ', '定期訪問', 'システム説明', '課題ヒアリング',
  '競合比較', '価格交渉', 'スケジュール調整', '資料送付',
  '電話確認', 'メール返信', 'オンライン会議', 'オフライン会議'
];

// 活動内容のサンプル
const activityDescriptions = [
  'システム要件について説明。現在の課題と要望をヒアリング。',
  '提案書を送付。来週にフィードバックをいただく予定。',
  '見積書を提出。予算内で実現可能な範囲を提示。',
  'デモンストレーションを実施。システムの機能を説明。',
  '契約条件について調整。来月に契約予定。',
  '最終確認のため訪問。契約書の内容を確認。',
  '契約締結。来月からサービス開始予定。',
  'フォローアップのため電話。満足度を確認。',
  '定期訪問。システムの運用状況を確認。',
  'システム説明を実施。新機能について説明。',
  '課題ヒアリング。改善点を確認。',
  '競合他社との比較検討中。来週に回答予定。',
  '価格交渉。予算内で調整可能か検討。',
  'スケジュール調整。プロジェクト開始時期を調整。',
  '資料送付。システム仕様書を送付。',
  '電話確認。進捗状況を確認。',
  'メール返信。質問事項に回答。',
  'オンライン会議。リモートで打ち合わせ。',
  'オフライン会議。直接会って打ち合わせ。',
  'その他の活動。'
];

// 次回アクションのサンプル
const nextActions = [
  '提案書を送付', '見積書を提出', 'デモンストレーションを実施',
  '契約条件を調整', '最終確認のため訪問', '契約締結',
  'フォローアップのため電話', '定期訪問', 'システム説明を実施',
  '課題ヒアリング', '競合比較', '価格交渉', 'スケジュール調整',
  '資料送付', '電話確認', 'メール返信', 'オンライン会議',
  'オフライン会議', 'その他'
];

// 失注理由のサンプル
const lostReasons = [
  '予算不足', '競合他社を選択', 'スケジュールが合わない',
  '要件が合わない', '社内事情により中止', 'その他'
];

// 日付生成ヘルパー
function randomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

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

// 顧客ステータスの分布
const customerStatuses = ['見込み', '商談中', '既存顧客', '休眠', '失注'];
const customerStatusWeights = [0.3, 0.3, 0.2, 0.1, 0.1];

// 見込み度の分布
const probabilities = ['高', '中', '低'];
const probabilityWeights = [0.4, 0.4, 0.2];

// 商談ステージの分布
const dealStages = ['見込み', '商談中', '提案中', '成約', '失注'];
const dealStageWeights = [0.2, 0.3, 0.25, 0.15, 0.1];

// 活動種別の分布
const activityTypes = ['電話', 'メール', '訪問', '会議', '提案', '見積', 'その他'];
const activityTypeWeights = [0.35, 0.25, 0.15, 0.12, 0.05, 0.05, 0.03];

// 重み付きランダム選択
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

// 顧客データ生成
function generateCustomers(count = 25) {
  const customers = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  for (let i = 1; i <= count; i++) {
    const customerId = `CUST-${String(i).padStart(3, '0')}`;
    const registrationDate = randomDate(threeMonthsAgo, now);
    const status = weightedRandom(customerStatuses, customerStatusWeights);
    const probability = weightedRandom(probabilities, probabilityWeights);
    const companyName = companyNames[i % companyNames.length];
    const department = Math.random() > 0.7 ? departments[Math.floor(Math.random() * departments.length)] : null;
    const position = Math.random() > 0.6 ? positions[Math.floor(Math.random() * positions.length)] : null;
    const assignedTo = assignees[Math.floor(Math.random() * assignees.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const prefecture = prefectures[Math.floor(Math.random() * prefectures.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    // 最終接触日の生成（ステータスに応じて）
    let lastContact = null;
    if (status === '既存顧客' || status === '商談中') {
      lastContact = randomDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now);
    } else if (status === '見込み') {
      lastContact = randomDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), now);
    } else if (status === '休眠') {
      lastContact = randomDate(threeMonthsAgo, new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000));
    } else {
      lastContact = randomDate(threeMonthsAgo, new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
    }
    
    const customer = {
      id: customerId,
      name: `${['山田', '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '中村', '小林', '加藤'][i % 10]}${['太郎', '花子', '一郎', '次郎', '三郎', '四郎', '五郎', '六郎', '七郎', '八郎'][Math.floor(i / 10)]}`,
      company: companyName,
      department: department,
      position: position,
      email: `${customerId.toLowerCase()}@${companyName.replace('株式会社', '').toLowerCase().replace(/\s+/g, '')}.co.jp`,
      phone: `0${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      postalCode: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      address: `${prefecture}${city}${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 9) + 1}`,
      industry: industry,
      employeeCount: [10, 20, 50, 100, 200, 500, 1000][Math.floor(Math.random() * 7)],
      annualRevenue: [1000, 5000, 10000, 50000, 100000, 500000][Math.floor(Math.random() * 6)],
      status: status,
      probability: probability,
      assignedTo: assignedTo,
      lastContact: lastContact ? formatDate(lastContact) : null,
      registrationDate: formatDate(registrationDate),
      notes: status === '商談中' ? '来月に契約予定。システム要件の最終確認が必要。' : 
             status === '既存顧客' ? 'リピート顧客。追加提案中。' :
             status === '見込み' ? '初期ヒアリング完了。提案書を送付予定。' :
             status === '休眠' ? '長期間連絡が取れない。' : '成約に至らなかった。',
      createdAt: registrationDate.toISOString(),
      updatedAt: (lastContact || registrationDate).toISOString()
    };
    
    customers.push(customer);
  }
  
  return customers;
}

// 商談データ生成
function generateDeals(customers, count = 20) {
  const deals = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  // 顧客ごとに商談を生成
  const activeCustomers = customers.filter(c => 
    c.status === '見込み' || c.status === '商談中' || c.status === '既存顧客'
  );
  
  let dealIndex = 1;
  for (let i = 0; i < activeCustomers.length && dealIndex <= count; i++) {
    const customer = activeCustomers[i];
    const dealCount = Math.floor(Math.random() * 2) + 1; // 1-2件
        
    for (let j = 0; j < dealCount && dealIndex <= count; j++) {
      const dealId = `DEAL-${String(dealIndex).padStart(3, '0')}`;
      const stage = weightedRandom(dealStages, dealStageWeights);
      const startDate = randomDate(threeMonthsAgo, now);
      const amount = [500000, 1000000, 2000000, 3000000, 5000000, 8000000, 10000000][Math.floor(Math.random() * 7)];
      const probability = stage === '成約' ? 100 : 
                         stage === '提案中' ? Math.floor(Math.random() * 30) + 60 :
                         stage === '商談中' ? Math.floor(Math.random() * 30) + 40 :
                         stage === '見込み' ? Math.floor(Math.random() * 30) + 20 : 0;
      
      let closeDate = null;
      let lostReason = null;
      if (stage === '成約') {
        closeDate = randomDate(startDate, now);
      } else if (stage === '失注') {
        lostReason = lostReasons[Math.floor(Math.random() * lostReasons.length)];
      }
      
      const expectedCloseDate = stage !== '失注' && stage !== '成約' ? 
        randomDate(now, new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)) : null;
      
      const deal = {
        id: dealId,
        customerId: customer.id,
        title: ['新規システム導入案件', '既存システム更新案件', '追加機能開発案件', '保守契約', 'コンサルティング案件'][Math.floor(Math.random() * 5)],
        amount: amount,
        stage: stage,
        probability: probability,
        expectedCloseDate: expectedCloseDate ? formatDate(expectedCloseDate) : null,
        assignedTo: customer.assignedTo,
        startDate: formatDate(startDate),
        updatedAt: formatDate(closeDate || now),
        closeDate: closeDate ? formatDate(closeDate) : null,
        lostReason: lostReason,
        notes: stage === '提案中' ? '競合他社との比較検討中。来週に最終回答予定。' :
               stage === '商談中' ? '要件定義中。来月に提案書を提出予定。' :
               stage === '成約' ? '契約締結済み。来月からサービス開始予定。' :
               stage === '失注' ? `失注理由: ${lostReason}` : '初期ヒアリング完了。',
        createdAt: startDate.toISOString()
      };
      
      deals.push(deal);
      dealIndex++;
    }
  }
  
  return deals;
}

// 活動履歴データ生成
function generateActivities(customers, deals, count = 60) {
  const activities = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  
  let activityIndex = 1;
  
  // 各顧客に対して2-8件の活動履歴を生成
  for (const customer of customers) {
    const activityCount = Math.floor(Math.random() * 7) + 2; // 2-8件
    
    for (let i = 0; i < activityCount && activityIndex <= count; i++) {
      const activityId = `ACT-${String(activityIndex).padStart(3, '0')}`;
      const type = weightedRandom(activityTypes, activityTypeWeights);
      const title = activityTitles[Math.floor(Math.random() * activityTitles.length)];
      const description = activityDescriptions[Math.floor(Math.random() * activityDescriptions.length)];
      const assignedTo = customer.assignedTo;
      const priority = ['高', '中', '低'][Math.floor(Math.random() * 3)];
      
      // 活動日時の生成（時系列順に）
      const daysAgo = Math.floor(Math.random() * 90);
      const activityDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      activityDate.setHours(Math.floor(Math.random() * 8) + 9); // 9-17時
      activityDate.setMinutes([0, 15, 30, 45][Math.floor(Math.random() * 4)]);
      
      // 次回アクションの生成（50%の確率で設定）
      const nextAction = Math.random() > 0.5 ? nextActions[Math.floor(Math.random() * nextActions.length)] : null;
      const nextActionDate = nextAction ? 
        formatDate(new Date(activityDate.getTime() + (Math.floor(Math.random() * 14) + 1) * 24 * 60 * 60 * 1000)) : null;
      
      const activity = {
        id: activityId,
        customerId: customer.id,
        activityDateTime: formatDateTime(activityDate),
        type: type,
        title: title,
        description: description,
        assignedTo: assignedTo,
        nextAction: nextAction,
        nextActionDate: nextActionDate,
        priority: priority,
        createdAt: activityDate.toISOString()
      };
      
      activities.push(activity);
      activityIndex++;
    }
  }
  
  // 日時でソート（最新が上）
  activities.sort((a, b) => new Date(b.activityDateTime) - new Date(a.activityDateTime));
  
  return activities.slice(0, count);
}

// メイン関数
function generateSampleData() {
  const customers = generateCustomers(25);
  const deals = generateDeals(customers, 20);
  const activities = generateActivities(customers, deals, 60);
  
  return {
    templateId: 'crm',
    version: '1.0.0',
    data: {
      customers: customers,
      deals: deals,
      activities: activities
    }
  };
}

// Node.js環境で実行
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateSampleData,
    generateCustomers,
    generateDeals,
    generateActivities
  };
  
  // 直接実行時
  if (require.main === module) {
    const fs = require('fs');
    const path = require('path');
    const data = generateSampleData();
    const outputPath = path.join(__dirname, 'sample-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`サンプルデータを生成しました: ${outputPath}`);
    console.log(`- 顧客: ${data.data.customers.length}件`);
    console.log(`- 商談: ${data.data.deals.length}件`);
    console.log(`- 活動履歴: ${data.data.activities.length}件`);
  }
}
