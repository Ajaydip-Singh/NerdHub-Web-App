import ReactQuill from 'react-quill'; // ES6

export default function TextEditor(props) {
  const { placeholder, value, onChange } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' }
      ],
      [({ list: 'ordered' }, { list: 'bullet' })],
      [{ color: ['white', 'black', 'red', 'blue', '#50d450'] }],
      [
        {
          background: [
            'white',
            'black',
            'red',
            'blue',
            'transparent',
            '#50d450'
          ]
        }
      ],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'size',
    'bold',
    'indent',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'align',
    'bullet',
    'link',
    'color',
    'background'
  ];

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
      ></ReactQuill>
    </div>
  );
}
