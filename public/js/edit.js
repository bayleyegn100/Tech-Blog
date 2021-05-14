const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();
  const id = +window.location.toString().split("/")[5]


  console.log(id)
  if (title && body) {
    const response = await fetch(`/api/blogPosts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body
      }),
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

const updateButton = document.querySelector('#update-button')

if (updateButton !== null) {
  updateButton.addEventListener('click', updateFormHandler);
}