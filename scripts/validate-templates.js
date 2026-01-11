/**
 * テンプレートJSONのバリデーションスクリプト
 * 
 * 使用方法:
 *   node scripts/validate-templates.js
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_JSON_PATH = path.join(__dirname, '../templates/api/templates.json');

const requiredFields = [
  'templateId',
  'name',
  'description',
  'category',
  'color',
  'version',
  'isPublic',
  'tags',
  'author'
];

const validColors = ['purple', 'orange', 'green', 'blue', 'slate'];

function validateTemplate(template, index) {
  const errors = [];
  const warnings = [];

  // 必須フィールドのチェック
  const missingFields = requiredFields.filter(field => !(field in template));
  if (missingFields.length > 0) {
    errors.push(`必須フィールドが不足しています: ${missingFields.join(', ')}`);
  }

  // templateIdの形式チェック
  if (template.templateId) {
    if (!/^[a-z0-9-]+$/.test(template.templateId)) {
      errors.push(`無効なtemplateId形式: ${template.templateId} (英数字とハイフンのみ許可)`);
    }
  }

  // colorの値チェック
  if (template.color) {
    if (!validColors.includes(template.color)) {
      errors.push(`無効なcolor値: ${template.color} (許可値: ${validColors.join(', ')})`);
    }
  }

  // versionの形式チェック（セマンティックバージョニング推奨）
  if (template.version) {
    if (!/^\d+\.\d+\.\d+/.test(template.version)) {
      warnings.push(`versionの形式が推奨されていません: ${template.version} (例: 1.0.0)`);
    }
  }

  // tagsの型チェック
  if (template.tags && !Array.isArray(template.tags)) {
    errors.push(`tagsは配列である必要があります: ${typeof template.tags}`);
  }

  // featuresの型チェック
  if (template.features && !Array.isArray(template.features)) {
    errors.push(`featuresは配列である必要があります: ${typeof template.features}`);
  }

  // isPublicの型チェック
  if (template.isPublic !== undefined && typeof template.isPublic !== 'boolean') {
    errors.push(`isPublicはbooleanである必要があります: ${typeof template.isPublic}`);
  }

  // URLの形式チェック（オプション）
  if (template.previewImageUrl && !template.previewImageUrl.startsWith('http')) {
    warnings.push(`previewImageUrlは完全なURLを推奨します: ${template.previewImageUrl}`);
  }

  if (template.demoUrl && !template.demoUrl.startsWith('http')) {
    warnings.push(`demoUrlは完全なURLを推奨します: ${template.demoUrl}`);
  }

  return { errors, warnings };
}

function validateTemplatesJson() {
  console.log('テンプレートJSONのバリデーションを開始します...\n');

  try {
    // JSONファイルの読み込み
    const jsonContent = fs.readFileSync(TEMPLATES_JSON_PATH, 'utf8');
    const data = JSON.parse(jsonContent);

    // templates配列の存在チェック
    if (!data.templates || !Array.isArray(data.templates)) {
      console.error('❌ エラー: templates配列が見つかりません');
      process.exit(1);
    }

    console.log(`✓ ${data.templates.length}個のテンプレートを検出\n`);

    let totalErrors = 0;
    let totalWarnings = 0;

    // 各テンプレートのバリデーション
    data.templates.forEach((template, index) => {
      console.log(`[${index + 1}] ${template.name || template.templateId || '無名テンプレート'}`);
      
      const { errors, warnings } = validateTemplate(template, index);

      if (errors.length > 0) {
        console.error('  ❌ エラー:');
        errors.forEach(error => console.error(`    - ${error}`));
        totalErrors += errors.length;
      }

      if (warnings.length > 0) {
        console.warn('  ⚠️  警告:');
        warnings.forEach(warning => console.warn(`    - ${warning}`));
        totalWarnings += warnings.length;
      }

      if (errors.length === 0 && warnings.length === 0) {
        console.log('  ✓ 問題なし\n');
      } else {
        console.log('');
      }
    });

    // 結果のサマリー
    console.log('='.repeat(50));
    console.log('バリデーション結果:');
    console.log(`  エラー: ${totalErrors}件`);
    console.log(`  警告: ${totalWarnings}件`);

    if (totalErrors > 0) {
      console.error('\n❌ バリデーションに失敗しました。エラーを修正してください。');
      process.exit(1);
    } else if (totalWarnings > 0) {
      console.warn('\n⚠️  警告がありますが、バリデーションは成功しました。');
      process.exit(0);
    } else {
      console.log('\n✓ すべてのテンプレートが正常です。');
      process.exit(0);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ エラー: ファイルが見つかりません: ${TEMPLATES_JSON_PATH}`);
    } else if (error instanceof SyntaxError) {
      console.error(`❌ エラー: JSONの構文エラー: ${error.message}`);
    } else {
      console.error(`❌ エラー: ${error.message}`);
    }
    process.exit(1);
  }
}

// スクリプトが直接実行された場合
if (require.main === module) {
  validateTemplatesJson();
}

module.exports = { validateTemplate, validateTemplatesJson };
