const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (title && body) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog post');
    }
  }
};

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    document.location.replace(`/edit/blogPost/${id}`)
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

let editButtons = document.querySelectorAll('.edit-button')
editButtons.forEach((btn) => {
  btn.addEventListener("click", editButtonHandler)
});

let deleteButtons = document.querySelectorAll('.delete-button')
deleteButtons.forEach((btn) => {
  btn.addEventListener("click", delButtonHandler)
});