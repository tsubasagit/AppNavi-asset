/**
 * テンプレートスキーマAPI
 * GET /api/templates/{templateId}/schema.json
 */

const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
  const templateId = req.params.templateId;
  const schemaPath = path.join(__dirname, '../../templates', templateId, 'schema.json');
  
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
    if (!fs.existsSync(schemaPath)) {
      res.status(404).json({
        error: 'テンプレートが見つかりません',
        templateId: templateId
      });
      return;
    }
    
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    res.status(200).json(schema);
  } catch (error) {
    console.error('Error loading schema:', error);
    res.status(500).json({
      error: 'スキーマの読み込みに失敗しました',
      message: error.message
    });
  }
};
