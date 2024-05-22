export class Post {
	#postEl = null;
	#commentsEl = null;
	#getPost = null;
	#getComments = null;
	#renderPost = null;
	#renderComment = null;
	#post = null;

	constructor(postEl, commentsEl, options) {
		const { getPost, getComments, renderPost, renderComment } = options;
		this.#postEl = postEl;
		this.#commentsEl = commentsEl;
		this.#getPost = getPost;
		this.#getComments = getComments;
		this.#renderPost = renderPost;
		this.#renderComment = renderComment;
		this.#post = this.getPost();
	}

	init() {
		window.onpopstate = () => {
			const url = new URL(window.location.href);
			const post = +url.searchParams.get('post');
			if (post !== this.#post) {
				this.setPost(post);
				this.loadPost();
				this.loadComments();
			}
		};
		this.loadPost();
		this.loadComments();
	}

	getPost() {
		const url = new URL(window.location.href);
		const post = +url.searchParams.get('id');
		return post;
	}

	setPost(post) {
		this.#post = post;
	}

	async loadPost() {
		try {
			const post = await this.#getPost(this.#post);
			this.renderPost(post);
		} catch (error) {
			console.log('Error:', error);
		}
	}

	async loadComments() {
		try {
			const comments = await this.#getComments(this.#post);
			this.renderComments(comments);
		} catch (error) {
			console.log('Error:', error);
		}
	}

	renderPost(post) {
		this.#postEl.innerHTML = this.#renderPost(post);
	}

	renderComments(comments) {
		this.#commentsEl.innerHTML = comments
			.map(this.#renderComment)
			.join(' ');
	}
}