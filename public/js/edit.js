const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();
  const id = +window.location.toString().split("/")[5];

  console.log(id);
  if (title && body) {
    const response = await fetch(`/api/blogPosts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create blog post");
    }
  }
};
async function deletePost(e) {
  e.preventDefault();
  const id = window.location.toString().split("/")[window.location.toString().split("/").length -1];
  const response = await fetch(`/api/blogPosts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delet blog post");
  }
}
const updateButton = document.querySelector("#update-button");

if (updateButton !== null) {
  updateButton.addEventListener("click", updateFormHandler);
}
const deleteButton = document.querySelector("#delete-button");
if (deleteButton !== null) {
  deleteButton.addEventListener("click", deletePost);
}
