import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';

import Comment from '../../ui/Comment';
import { useState } from 'react';
import Button from '../../ui/Button';
import { useComment } from './useComment';

const Comments = ({ comments }) => {
	const [comment, setComment] = useState('');
	const { id } = useParams();

	const { isCommenting, createComment } = useComment();

	const handleComment = () => {
		if (!comment) return;

		createComment({
			post: id,
			comment,
		});

		setComment('');
	};

	return (
		<div className="flex flex-col gap-3">
			<h2 className="text-xl font-medium">Comments</h2>
			<ul className="flex flex-col gap-5">
				{comments.length === 0 ? (
					<p className="text-sm">There is no comment for this post yet ...</p>
				) : (
					comments.map((comment) => <Comment key={comment._id} comment={comment} />)
				)}
			</ul>

			<div className="pt-7 flex flex-col gap-2">
				<Editor
					apiKey="bc3xh71zvc04l440muc4aoatmptmhvnps2qzarfltcffhuag"
					onEditorChange={(_, editor) => {
						setComment(editor.getContent({ format: 'text' }));
					}}
					onInit={(_, editor) => setComment(editor.getContent({ format: 'text' }))}
					init={{
						plugins: 'autolink',
						toolbar: 'codesample',
						resize: false,
						height: '300px',
						outerHeight: '0px',
						content_style: `
					body{
						font-size:13px
					}
					`,
					}}
				/>
				<span>
					<Button mode={isCommenting} onClick={handleComment}>
						comment
					</Button>
				</span>
			</div>
		</div>
	);
};

export default Comments;
