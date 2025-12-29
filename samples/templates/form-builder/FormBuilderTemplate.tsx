import React, { useState } from 'react'
import { Search, Plus, Trash2, Eye, Save } from 'lucide-react'
import './FormBuilderTemplate.css'

export interface FormField {
  id: string
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox' | 'date'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

export interface FormBuilderTemplateProps {
  title?: string
  showSearch?: boolean
  initialFields?: FormField[]
  onSave?: (fields: FormField[]) => void
}

export const FormBuilderTemplate: React.FC<FormBuilderTemplateProps> = ({
  title = 'フォームビルダー',
  showSearch = true,
  initialFields = [],
  onSave
}) => {
  const [fields, setFields] = useState<FormField[]>(
    initialFields.length > 0
      ? initialFields
      : [
          {
            id: '1',
            type: 'text',
            label: '名前',
            placeholder: 'お名前を入力',
            required: true
          },
          {
            id: '2',
            type: 'email',
            label: 'メールアドレス',
            placeholder: 'email@example.com',
            required: true
          }
        ]
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const filteredFields = searchQuery
    ? fields.filter(field =>
        field.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fields

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: '新しいフィールド',
      placeholder: '',
      required: false
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map(field => (field.id === id ? { ...field, ...updates } : field))
    )
  }

  const handleSave = () => {
    if (onSave) {
      onSave(fields)
    }
    alert('フォームが保存されました！')
  }

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData({ ...formData, [fieldId]: value })
  }

  const renderFieldEditor = (field: FormField) => {
    return (
      <div key={field.id} className="field-editor">
        <div className="field-editor-header">
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
            className="field-label-input"
            placeholder="フィールド名"
          />
          <button
            onClick={() => removeField(field.id)}
            className="remove-field-button"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="field-editor-body">
          <select
            value={field.type}
            onChange={(e) =>
              updateField(field.id, { type: e.target.value as FormField['type'] })
            }
            className="field-type-select"
          >
            <option value="text">テキスト</option>
            <option value="email">メール</option>
            <option value="number">数値</option>
            <option value="select">選択肢</option>
            <option value="textarea">テキストエリア</option>
            <option value="checkbox">チェックボックス</option>
            <option value="date">日付</option>
          </select>

          <input
            type="text"
            value={field.placeholder || ''}
            onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
            className="field-placeholder-input"
            placeholder="プレースホルダー"
          />

          <label className="field-required-checkbox">
            <input
              type="checkbox"
              checked={field.required || false}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
            />
            必須項目
          </label>
        </div>
      </div>
    )
  }

  const renderFieldPreview = (field: FormField) => {
    const value = formData[field.id] || ''

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <div key={field.id} className="form-field-preview">
            <label>
              {field.label}
              {field.required && <span className="required-mark">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        )

      case 'textarea':
        return (
          <div key={field.id} className="form-field-preview">
            <label>
              {field.label}
              {field.required && <span className="required-mark">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className="form-field-preview">
            <label>
              {field.label}
              {field.required && <span className="required-mark">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              required={field.required}
            >
              <option value="">選択してください</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.id} className="form-field-preview">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                required={field.required}
              />
              {field.label}
              {field.required && <span className="required-mark">*</span>}
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="form-builder-template">
      <header className="form-builder-header">
        <h1>{title}</h1>
        <div className="form-builder-actions">
          {showSearch && (
            <div className="form-builder-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="フィールドを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          )}
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="preview-toggle-button"
          >
            <Eye size={18} />
            {previewMode ? '編集モード' : 'プレビュー'}
          </button>
          <button onClick={handleSave} className="save-button">
            <Save size={18} />
            保存
          </button>
        </div>
      </header>

      <div className="form-builder-content">
        {previewMode ? (
          <div className="form-preview">
            <h2>フォームプレビュー</h2>
            <form className="preview-form">
              {filteredFields.map(renderFieldPreview)}
              <button type="submit" className="submit-button">
                送信
              </button>
            </form>
          </div>
        ) : (
          <div className="form-editor">
            <div className="form-editor-header">
              <h2>フィールド編集</h2>
              <button onClick={addField} className="add-field-button">
                <Plus size={18} />
                フィールドを追加
              </button>
            </div>

            {filteredFields.length > 0 ? (
              <div className="fields-list">
                {filteredFields.map(renderFieldEditor)}
              </div>
            ) : (
              <div className="no-fields">
                {searchQuery ? (
                  <p>検索結果が見つかりませんでした</p>
                ) : (
                  <p>フィールドがありません。「フィールドを追加」をクリックして追加してください。</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormBuilderTemplate

