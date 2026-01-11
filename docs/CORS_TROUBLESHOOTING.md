# CORS トラブルシューティングガイド

## 問題: GitHub PagesでCORSエラーが発生する

### 原因

GitHub Pagesでは、`_headers`ファイルが直接サポートされていません。そのため、CORSヘッダーを設定することができません。

### 解決方法

#### 方法1: AppNavi側でCORSエラーを回避（推奨）

AppNavi側で以下のいずれかの方法でCORSエラーを回避してください：

1. **プロキシサーバー経由で取得**
   - AppNaviのバックエンドサーバー経由でテンプレートを取得
   - バックエンドサーバーでCORSヘッダーを設定

2. **JSONP形式で取得**
   - JSONP形式でテンプレートを提供（非推奨）

3. **CORSエラーを適切にハンドリング**
   - エラー時にローカルテンプレートのみ表示
   - ユーザーに適切なメッセージを表示

#### 方法2: Netlify/Vercelへの移行

NetlifyやVercelでは`_headers`ファイルが直接サポートされています：

**Netlify**:
```bash
# _headersファイルをルートに配置
# Netlifyが自動的にCORSヘッダーを設定
```

**Vercel**:
```bash
# vercel.jsonでCORSを設定
{
  "headers": [
    {
      "source": "/api/templates.json",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ]
}
```

#### 方法3: GitHub Pagesの代替案

GitHub Pagesでは、静的ファイル（JSON）の場合、CORSエラーが発生しない場合があります：

- 同一オリジンからのアクセス
- ブラウザの設定による
- 一部のブラウザではJSONファイルはCORSチェックが緩い

### 現在の実装状況

✅ **ファイル配置**: `dist/api/templates.json`に正しく配置
✅ **.nojekyllファイル**: Jekyllの処理を無効化
❌ **CORS設定**: GitHub Pagesでは直接サポートされていない

### 推奨対応

1. **短期的対応**: AppNavi側でCORSエラーを適切にハンドリング
2. **長期的対応**: Netlify/Vercelへの移行を検討

### テスト方法

```bash
# ファイルの存在確認
curl -I https://tsubasagit.github.io/AppNavi-asset/api/templates.json

# CORSヘッダーの確認
curl -H "Origin: https://example.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

---

**最終更新日**: 2024年12月29日
