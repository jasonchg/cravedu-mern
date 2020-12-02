import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'blockQuote',
    'link',
    'numberedList',
    'bulletedList',
    'insertTable',
    'tableColumn',
    'tableRow',
    'mergeTableCells',
    '|',
    'undo',
    'redo',
  ],
}
const TextEditor = ({ description, setter }) => {
  return (
    <CKEditor
      required
      editor={ClassicEditor}
      config={editorConfiguration}
      data={description !== '' ? description : ''}
      onChange={(event, editor) => {
        const data = editor.getData()
        setter(data)
      }}
    />
  )
}

export default TextEditor
