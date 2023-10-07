import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';

import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import { useCreatePost } from './useCreatePost';

const CreatePost = () => {
 const { isCreating, createPost } = useCreatePost();
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [category, setCategory] = useState('');
 const [image, setImage] = useState(null);

 const checkedContents = [
  { label: 'Health', name: 'Health' },
  { label: 'Travel', name: 'Travel' },
  { label: 'Food', name: 'Food' },
  { label: 'Lifestyle', name: 'Lifestyle' },
  { label: 'Ai', name: 'AI' },
 ];

 const handleChange = (e) => {
  setCategory(e.target.value);
 };

 const handleSubmit = () => {
  if (!title) {
   return toast.error('Please provide post title');
  }

  // 500 - 750; CONTENT LENGTH
  if (Number(content.split(' ').length) < 200) {
   return toast.error('Content must be more than 200 words');
  }

  if (Number(content.split(' ').length) > 750) {
   return toast.error('Content can not exceed 750 words sorry');
  }

  if (!category) {
   return toast.error('Provide a post category');
  }

  if (!image) {
   return toast.error('Image must be privided');
  }

  const formData = new FormData();

  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('image', image);

  createPost(formData);
 };

 useEffect(() => {
  document.title = 'Novel Notion || Create new post';
 }, []);

 return (
  <div className='lg:h-[35rem] dark:bg-neutral-800 dark:text-neutral-100'>
   <div className='h-full px-10 py-7 grid md:grid-cols-3 gap-3 md:px-20 lg:px-32'>
    <div className='flex flex-col gap-2 md:col-span-2'>
     <h1 className='text-xl lg:text-2xl font-bold'>Add New Post 🖋</h1>
     <input
      type='text'
      placeholder='Title here ...'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='text-sm px-3 py-2 rounded-sm outline-none focus:bg-neutral-50 transition-all duration-600 text-neutral-700'
     />
     <label htmlFor='image' className='text-sm'>
      Choose post image{' '}
      <span className='text-blue-800 underline cursor-pointer dark:text-neutral-100'>
       here
      </span>{' '}
      {image && image.name}
     </label>
     <input
      type='file'
      accept='image/*'
      name='image'
      id='image'
      hidden
      onChange={(e) => setImage(e.target.files[0])}
     />

     <div>
      <Editor
       apiKey='bc3xh71zvc04l440muc4aoatmptmhvnps2qzarfltcffhuag'
       onEditorChange={(_, editor) => {
        setContent(editor.getContent({ format: 'text' }));
       }}
       onInit={(_, editor) => setContent(editor.getContent({ format: 'text' }))}
       initialValue='Write down your new post here ... 😊'
       init={{
        selector: 'textarea#file-picker',
        plugins:
         'accordion lists advlist anchor autolink autosave code codesample help lists preview',
        toolbar:
         'accordion anchor restoredraft code codesample help numlist bullist preview',
        details_initial_state: 'collapsed',
        resize: false,
       }}
      />
     </div>
    </div>

    <div className='flex flex-col gap-3'>
     <div className='border-[1px] bg-neutral-50 h-48 rounded-sm p-3 flex flex-col gap-3 dark:text-neutral-800'>
      <h2 className='text-xl font-medium'>Categories</h2>
      <ul>
       {Array.from(checkedContents).map((check, i) => (
        <Checkbox
         key={i + 1}
         label={check.label}
         name={check.name}
         category={category}
         onChange={handleChange}
        />
       ))}
      </ul>
     </div>

     <Button mode={isCreating} onClick={handleSubmit}>
      Publish
     </Button>
    </div>
   </div>
  </div>
 );
};

export default CreatePost;
