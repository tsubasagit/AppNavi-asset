/**
 * テンプレート適用用の統合API
 * GET /api/templates/{templateId}/apply.json
 * 
 * テンプレートのスキーマ、ビュー、サンプルデータを統合して返す
 */

const fs = require('fs');
const path = require('path');

module.exports = function(req, res) {
  const templateId = req.params.templateId;
  const templateDir = path.join(__dirname, '../../templates', templateId);
  
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
    const schemaPath = path.join(templateDir, 'schema.json');
    const viewsPath = path.join(templateDir, 'views.json');
    const dataPath = path.join(templateDir, 'sample-data.json');
    
    if (!fs.existsSync(schemaPath)) {
      res.status(404).json({
        error: 'スキーマが見つかりません',
        templateId: templateId
      });
      return;
    }
    
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const views = fs.existsSync(viewsPath) 
      ? JSON.parse(fs.readFileSync(viewsPath, 'utf8'))
      : null;
    const sampleData = fs.existsSync(dataPath)
      ? JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      : null;
    
    // 統合データを返す
    const result = {
      templateId: templateId,
      version: schema.version || '1.0.0',
      name: schema.name,
      description: schema.description,
      schema: schema,
      views: views ? views.views : null,
      sampleData: sampleData ? sampleData.data : null,
      metadata: {
        hasViews: !!views,
        hasSampleData: !!sampleData,
        tableCount: schema.tables ? schema.tables.length : 0,
        viewCount: views && views.views ? views.views.length : 0
      }
    };
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error loading template:', error);
    res.status(500).json({
      error: 'テンプレートの読み込みに失敗しました',
      message: error.message
    });
  }
};
