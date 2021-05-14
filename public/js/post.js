const newCommentHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-body').value.trim();
  const blogPostID = +window.location.pathname.split("/")[2]
  const blogCommentData = {
    body,
    blogPost_id: blogPostID,
  };

  if (body) {
    const response = await fetch(`/api/blogComments`, {
      method: 'POST',
      body: JSON.stringify(blogCommentData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentHandler);