/**
 * Googleスプレッドシート形式のサンプルデータ生成API
 * GET /api/templates/{templateId}/spreadsheet
 * 
 * クエリパラメータ:
 * - format: 'csv' (デフォルト) または 'integrated'
 * - table: 特定のテーブルのみ取得する場合
 */

const fs = require('fs');
const path = require('path');
const { generateSpreadsheetData, generateIntegratedSpreadsheet } = require('../../utils/spreadsheet-generator');

module.exports = function(req, res) {
  const templateId = req.params.templateId;
  const format = req.query.format || 'csv';
  const tableName = req.query.table;
  
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const templateDir = path.join(__dirname, '../../templates', templateId);
    const schemaPath = path.join(templateDir, 'schema.json');
    const dataPath = path.join(templateDir, 'sample-data.json');
    
    if (!fs.existsSync(schemaPath)) {
      res.status(404).json({
        error: 'スキーマが見つかりません',
        templateId: templateId
      });
      return;
    }
    
    if (!fs.existsSync(dataPath)) {
      res.status(404).json({
        error: 'サンプルデータが見つかりません',
        templateId: templateId
      });
      return;
    }
    
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const sampleData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (format === 'integrated') {
      // 統合形式（全テーブルを1つのCSVに）
      const csv = generateIntegratedSpreadsheet(sampleData.data, schema);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${templateId}-all-tables.csv"`);
      res.status(200).send(csv);
    } else {
      // 個別形式（各テーブルごと）
      const spreadsheetData = generateSpreadsheetData(sampleData.data, schema);
      
      if (tableName) {
        // 特定のテーブルのみ
        if (!spreadsheetData[tableName]) {
          res.status(404).json({
            error: 'テーブルが見つかりません',
            tableName: tableName
          });
          return;
        }
        
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${templateId}-${tableName}.csv"`);
        res.status(200).send(spreadsheetData[tableName].csv);
      } else {
        // 全テーブルをJSON形式で返す
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.status(200).json({
          templateId: templateId,
          format: 'csv',
          tables: spreadsheetData
        });
      }
    }
  } catch (error) {
    console.error('Error generating spreadsheet:', error);
    res.status(500).json({
      error: 'スプレッドシートの生成に失敗しました',
      message: error.message
    });
  }
};
