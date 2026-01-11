/**
 * テンプレートサンプルデータAPI
 * GET /api/templates/{templateId}/sample-data.json
 */

const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
  const templateId = req.params.templateId;
  const dataPath = path.join(__dirname, '../../templates', templateId, 'sample-data.json');
  
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
    if (!fs.existsSync(dataPath)) {
      res.status(404).json({
        error: 'サンプルデータが見つかりません',
        templateId: templateId
      });
      return;
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error loading sample data:', error);
    res.status(500).json({
      error: 'サンプルデータの読み込みに失敗しました',
      message: error.message
    });
  }
};
