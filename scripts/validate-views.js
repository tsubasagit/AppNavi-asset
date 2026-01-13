/**
 * views.jsonの構造を検証するスクリプト
 */

const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, '../templates/templates/crm/views.json');

console.log('CRMテンプレートのviews.jsonを検証します...\n');

try {
  const viewsData = JSON.parse(fs.readFileSync(viewsPath, 'utf8'));
  
  console.log('✓ JSONの構文は正しいです\n');
  
  // 基本構造の確認
  console.log('=== 基本情報 ===');
  console.log(`Template ID: ${viewsData.templateId}`);
  console.log(`Version: ${viewsData.version}`);
  console.log(`Views count: ${viewsData.views ? viewsData.views.length : 0}`);
  console.log(`Theme: ${viewsData.theme ? 'あり' : 'なし'}\n`);
  
  if (!viewsData.views || !Array.isArray(viewsData.views)) {
    console.error('❌ エラー: views配列が存在しないか、配列ではありません');
    process.exit(1);
  }
  
  // 各ビューの検証
  console.log('=== ビューの詳細 ===');
  viewsData.views.forEach((view, index) => {
    console.log(`\n[${index + 1}] ${view.name || '名前なし'}`);
    console.log(`  ID: ${view.id || 'なし'}`);
    console.log(`  Type: ${view.type || 'なし'}`);
    console.log(`  Route: ${view.route || 'なし'}`);
    
    const errors = [];
    const warnings = [];
    
    if (!view.id) errors.push('IDがありません');
    if (!view.name) errors.push('名前がありません');
    if (!view.type) errors.push('タイプがありません');
    if (!view.route) warnings.push('ルートがありません（ダッシュボード以外は推奨）');
    
    if (view.type === 'dashboard') {
      if (!view.widgets || !Array.isArray(view.widgets)) {
        errors.push('ダッシュボードにウィジェットがありません');
      } else {
        console.log(`  Widgets: ${view.widgets.length}個`);
      }
    }
    
    if (view.type === 'table') {
      if (!view.table) errors.push('テーブル名がありません');
      if (!view.columns || !Array.isArray(view.columns)) {
        errors.push('カラム定義がありません');
      } else {
        console.log(`  Table: ${view.table}`);
        console.log(`  Columns: ${view.columns.length}個`);
      }
    }
    
    if (view.type === 'kanban') {
      if (!view.table) errors.push('テーブル名がありません');
      if (!view.stages || !Array.isArray(view.stages)) {
        errors.push('ステージ定義がありません');
      } else {
        console.log(`  Table: ${view.table}`);
        console.log(`  Stages: ${view.stages.length}個`);
      }
    }
    
    if (errors.length > 0) {
      console.error(`  ❌ エラー: ${errors.join(', ')}`);
    }
    if (warnings.length > 0) {
      console.warn(`  ⚠️ 警告: ${warnings.join(', ')}`);
    }
    if (errors.length === 0 && warnings.length === 0) {
      console.log('  ✓ 問題なし');
    }
  });
  
  console.log('\n=== 検証結果 ===');
  const totalViews = viewsData.views.length;
  const viewsWithErrors = viewsData.views.filter(view => {
    const hasErrors = 
      !view.id || 
      !view.name || 
      !view.type ||
      (view.type === 'dashboard' && (!view.widgets || !Array.isArray(view.widgets))) ||
      (view.type === 'table' && (!view.table || !view.columns || !Array.isArray(view.columns))) ||
      (view.type === 'kanban' && (!view.table || !view.stages || !Array.isArray(view.stages)));
    return hasErrors;
  }).length;
  
  if (viewsWithErrors === 0) {
    console.log(`✓ すべてのビュー（${totalViews}個）が正常です`);
  } else {
    console.error(`❌ ${viewsWithErrors}個のビューに問題があります`);
    process.exit(1);
  }
  
  // ルートの重複チェック
  console.log('\n=== ルートの重複チェック ===');
  const routes = viewsData.views
    .map(view => view.route)
    .filter(route => route);
  const duplicateRoutes = routes.filter((route, index) => routes.indexOf(route) !== index);
  if (duplicateRoutes.length > 0) {
    console.warn(`⚠️ 重複するルート: ${[...new Set(duplicateRoutes)].join(', ')}`);
  } else {
    console.log('✓ ルートの重複はありません');
  }
  
} catch (error) {
  console.error('❌ エラー:', error.message);
  process.exit(1);
}
