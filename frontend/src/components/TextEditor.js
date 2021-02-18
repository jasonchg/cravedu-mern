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
<<<<<<< HEAD
      data={description}
=======
      data={description !== '' ? description : ''}
>>>>>>> f4a828b (initial)
      onChange={(event, editor) => {
        const data = editor.getData()
        setter(data)
      }}
    />
  )
}

export default TextEditor
