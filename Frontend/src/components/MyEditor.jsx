import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const MyEditor = () => {
    const [value, setValue] = useState(`
            <p>hello world</p>
            <p>Some initial <strong>blod text<strong></p>
        `);

    const modules = {
        toolbar: [
            [{ 'header': [false, 1, 2] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ]
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <div className='p-4'>
            <ReactQuill value={value} onChange={setValue} modules={modules} formats={formats} placeholder='Write something...' />
            <div className='mt-5 p-3 border border-gray-300 rounded bg-white'>
                <strong>Output:</strong>
                <div dangerouslySetInnerHTML={{ __html: value}} />
            </div>
        </div>
    );
};

export default MyEditor