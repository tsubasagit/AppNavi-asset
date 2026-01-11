/**
 * Googleスプレッドシート形式のデータ生成ユーティリティ
 */

/**
 * JSONデータをGoogleスプレッドシート形式（CSV）に変換
 * @param {Object} data - サンプルデータオブジェクト
 * @param {Object} schema - スキーマ定義
 * @returns {Object} - 各テーブルごとのCSVデータ
 */
function generateSpreadsheetData(data, schema) {
  const result = {};
  
  if (!schema || !schema.tables) {
    throw new Error('スキーマが不正です');
  }
  
  // 各テーブルごとにCSVを生成
  schema.tables.forEach(table => {
    const tableName = table.name;
    const tableData = data[tableName] || [];
    
    if (tableData.length === 0) {
      result[tableName] = {
        csv: '',
        headers: []
      };
      return;
    }
    
    // ヘッダー行を生成
    const headers = table.fields.map(field => field.label || field.name);
    
    // データ行を生成
    const rows = tableData.map(row => {
      return table.fields.map(field => {
        const value = row[field.name];
        
        if (value === null || value === undefined) {
          return '';
        }
        
        // 型に応じてフォーマット
        switch (field.type) {
          case 'date':
            return formatDate(value);
          case 'timestamp':
            return formatDateTime(value);
          case 'number':
            if (field.format === 'currency') {
              return formatCurrency(value);
            } else if (field.format === 'percentage') {
              return formatPercentage(value);
            }
            return String(value);
          case 'email':
          case 'string':
          case 'text':
          default:
            // CSVエスケープ処理
            return escapeCSV(String(value));
        }
      });
    });
    
    // CSV文字列を生成
    const csvLines = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ];
    
    result[tableName] = {
      csv: csvLines.join('\n'),
      headers: headers,
      rowCount: rows.length
    };
  });
  
  return result;
}

/**
 * 日付をフォーマット（YYYY-MM-DD）
 */
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toISOString().split('T')[0];
}

/**
 * 日時をフォーマット（YYYY-MM-DD HH:MM:SS）
 */
function formatDateTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 通貨をフォーマット（¥1,000,000）
 */
function formatCurrency(value) {
  if (value === null || value === undefined) return '';
  return `¥${Number(value).toLocaleString('ja-JP')}`;
}

/**
 * パーセンテージをフォーマット（70%）
 */
function formatPercentage(value) {
  if (value === null || value === undefined) return '';
  return `${Number(value)}%`;
}

/**
 * CSVの特殊文字をエスケープ
 */
function escapeCSV(value) {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * 統合データを生成（全テーブルを1つのCSVに）
 */
function generateIntegratedSpreadsheet(data, schema) {
  const tables = generateSpreadsheetData(data, schema);
  const tableNames = Object.keys(tables);
  
  if (tableNames.length === 0) {
    return '';
  }
  
  // 各テーブルを空行で区切って結合
  const csvSections = tableNames.map(tableName => {
    const tableInfo = tables[tableName];
    return `=== ${tableName} ===\n${tableInfo.csv}`;
  });
  
  return csvSections.join('\n\n');
}

module.exports = {
  generateSpreadsheetData,
  generateIntegratedSpreadsheet
};
