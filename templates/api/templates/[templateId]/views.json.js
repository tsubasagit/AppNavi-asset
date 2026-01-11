/**
 * テンプレートビュー定義API
 * GET /api/templates/{templateId}/views.json
 */

const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
  const templateId = req.params.templateId;
  const viewsPath = path.join(__dirname, '../../templates', templateId, 'views.json');
  
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    if (!fs.existsSync(viewsPath)) {
      res.status(404).json({
        error: 'ビュー定義が見つかりません',
        templateId: templateId
      });
      return;
    }
    
    const views = JSON.parse(fs.readFileSync(viewsPath, 'utf8'));
    res.status(200).json(views);
  } catch (error) {
    console.error('Error loading views:', error);
    res.status(500).json({
      error: 'ビュー定義の読み込みに失敗しました',
      message: error.message
    });
  }
};
