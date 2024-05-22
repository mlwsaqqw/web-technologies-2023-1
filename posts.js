import { Post } from './src/components/post.js';

const renderPostItem = (item) => `
    <div class="post-box">
        <div class="id-container">
            <h3>User ID: ${item.userId}</h3>
            <h3>Post ID: ${item.id}</h3>
        </div>
        <h4>${item.title}</h4>
        <p>${item.body}</p>
    </div>
`;

const renderCommentItem = (item) => {
	return `
        <div class="comment-box">
            <div class="comment">
                <h3>${item.email}</h3>
                <p>${item.body}</p>
            </div>
        </div>
    `;
};

const getPostItem = async (postId) => {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}`
		);
		return await response.json();
	} catch (error) {
		console.log('Error:', error);
	}
};

const getCommentItems = async (postId) => {
	try {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
		);
		return await response.json();
	} catch (error) {
		console.log('Error:', error);
	}
};

const init = () => {
	const postEl = document.getElementById('post');
	const commentsEl = document.getElementById('comments');
	new Post(postEl, commentsEl, {
		getPost: getPostItem,
		getComments: getCommentItems,
		renderPost: renderPostItem,
		renderComment: renderCommentItem,
	}).init();
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}