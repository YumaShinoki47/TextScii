# 🎨 TextScii

**AI-powered Text to ASCII Art Generator**

テキスト入力からAIがイメージを解釈し、アスキーアートとして出力するサービスです。多様なスタイルとカスタマイズ機能を備え、ユーザーは簡単に独自のアートを生成できます。

## 🌟 主な機能

- **AI解釈による創造性**: テキストから想像力で視覚化
- **多様なスタイル**: クラシック、モダン、ミニマル、アーティスティック
- **カスタマイズ機能**: サイズ、文字セット、密度調整
- **リアルタイム修正**: 自然言語での追加修正指示
- **エクスポート機能**: コピー・ダウンロード対応
- **レスポンシブデザイン**: モバイル・デスクトップ対応

## 🚀 クイックスタート

### 必要環境
- **Python 3.8+**
- **Node.js 16+**
- **Google Gemini API キー**

### 1. リポジトリクローン
```bash
git clone <repository-url>
cd textscii
```

### 2. バックエンドセットアップ
```bash
cd backend

# 依存関係インストール
pip install -r requirements.txt

# 環境変数設定
cp .env.example .env
# .env ファイルにGoogle Gemini APIキーを設定

# サーバー起動
python main.py
```

### 3. フロントエンドセットアップ
```bash
cd frontend

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

### 4. アプリケーション利用
- **WebUI**: http://localhost:3000
- **API**: http://localhost:8000
- **API仕様**: http://localhost:8000/docs

## 🏗️ 技術構成

### バックエンド
- **言語**: Python 3.8+
- **フレームワーク**: FastAPI
- **AI API**: Google Gemini API
- **HTTP サーバー**: Uvicorn

### フロントエンド
- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **HTTPクライアント**: Axios
- **アイコン**: Lucide React

## 📁 プロジェクト構造

```
textscii/
├── backend/                    # Python FastAPI バックエンド
│   ├── app/
│   │   ├── api/               # APIエンドポイント
│   │   ├── models/            # データモデル
│   │   └── services/          # ビジネスロジック
│   ├── main.py                # エントリーポイント
│   └── requirements.txt       # Python依存関係
├── frontend/                   # React フロントエンド
│   ├── src/
│   │   ├── components/        # UIコンポーネント
│   │   ├── hooks/            # カスタムフック
│   │   ├── services/         # API通信
│   │   └── types/            # TypeScript型定義
│   ├── package.json          # Node.js依存関係
│   └── vite.config.ts        # Vite設定
└── README.md                  # このファイル
```

## 🎯 使用方法

### 基本的な使い方
1. テキスト欄に生成したい内容を日本語で入力
   - 例: 「猫が寝ている」「桜の木」「山の風景」
2. スタイルを選択（クラシック、モダン、ミニマル、アーティスティック）
3. 必要に応じて詳細設定を調整
4. 「アスキーアート生成」ボタンをクリック
5. 生成されたアートをコピーまたはダウンロード

### 高度な機能
- **修正機能**: 「もっと幻想的に」「シンプルに」等の指示で追加修正
- **詳細設定**: 幅・高さ・文字セット・密度の細かい調整
- **エクスポート**: テキストファイルとしてダウンロード可能

## 🔧 開発者向け

### API エンドポイント
- `POST /api/v1/generate-ascii` - アスキーアート生成
- `POST /api/v1/refine-ascii` - アスキーアート修正
- `GET /health` - ヘルスチェック

### 環境変数
```bash
# .env ファイル
GOOGLE_API_KEY=your_google_gemini_api_key_here
ENVIRONMENT=development
LOG_LEVEL=INFO
```

### ビルド
```bash
# フロントエンド本番ビルド
cd frontend
npm run build

# バックエンドはそのまま本番環境で実行可能
```


## 🙏 謝辞

- [Google Gemini API](https://ai.google.dev/) - AI text generation
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework