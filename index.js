// document.getElementById("darkModeSwitch").addEventListener("change", function() {
//     document.body.classList.toggle("dark-mode");
//     const cards = document.querySelectorAll(".card");
//     cards.forEach(card => card.classList.toggle("dark-mode"));
//     const textareas = document.querySelectorAll(".form-control");
//     textareas.forEach(textarea => textarea.classList.toggle("dark-mode"));
// });

// // Variable to store posts
// let posts = [
//     {
//         content: "This is a sample post to get you started.",
//         image: "https://via.placeholder.com/150", // Placeholder image URL
//         votes: 5,
//         comments: [
//             {
//                 content: "Great post!",
//                 comments: []
//             },
//             {
//                 content: "I agree, very informative.",
//                 comments: [
//                     {
//                         content: "Thanks for the feedback!",
//                         comments: []
//                     }
//                 ]
//             }
//         ],
//         date: new Date().toISOString()
//     }
// ];

// // Function to display posts
// function displayPosts() {
//     const sortOption = document.getElementById("sort").value;
//     if (sortOption === "latest") {
//         posts.sort((a, b) => new Date(b.date) - new Date(a.date));
//     } else if (sortOption === "rank") {
//         posts.sort((a, b) => b.votes - a.votes);
//     }

//     const postsContainer = document.getElementById("posts");
//     postsContainer.innerHTML = "";
//     posts.forEach((post, index) => {
//         const postElement = document.createElement("div");
//         postElement.classList.add("card");
//         postElement.classList.add(document.body.classList.contains("dark-mode") ? "dark-mode" : ""); // Add dark mode class if enabled
//         postElement.innerHTML = `
//             <div class="card-header d-flex justify-content-between align-items-center ${document.body.classList.contains("dark-mode") ? "dark-mode" : ""}"> <!-- Add dark mode class if enabled -->
//                 <span class="vote" onclick="upvote(${index})"><i class="fas fa-arrow-up"></i></span>
//                 <span>${post.votes}</span>
//                 <span class="vote" onclick="downvote(${index})"><i class="fas fa-arrow-down"></i></span>
//             </div>
//             <div class="card-body ${document.body.classList.contains("dark-mode") ? "dark-mode" : ""}"> <!-- Add dark mode class if enabled -->
//                 <p>${post.content}</p>
//                 ${post.image ? `<img src="${post.image}" class="post-image" alt="Post Image">` : ''} <!-- Display image if available -->
//                 <div class="comments mt-3 ${document.body.classList.contains("dark-mode") ? "dark-mode" : ""}"> <!-- Add dark mode class if enabled -->
//                     ${renderComments(post.comments, index)}
//                 </div>
//                 <p class="add-comment-link" onclick="showCommentForm(this, ${index})">Add a comment</p>
//                 <form class="comment-form d-none" onsubmit="addComment(event, ${index}, null)">
//                     <div class="form-group">
//                         <textarea placeholder="Write a comment..." class="form-control" rows="2" required maxlength="200"></textarea>
//                         <small class="form-text text-muted">0/200 characters</small>
//                     </div>
//                     <button type="submit" class="btn btn-primary btn-sm">Comment</button>
//                 </form>
//             </div>
//         `;
//         postsContainer.appendChild(postElement);
//     });
// }

// // Function to render comments
// function renderComments(comments, postIndex, parentCommentIndex = null) {
//     return comments.map((comment, index) => `
//         <div class="comment">
//             <p>${comment.content}</p>
//             <div class="comments">
//                 ${renderComments(comment.comments, postIndex, index)}
//             </div>
//             <p class="add-comment-link" onclick="showCommentForm(this, ${postIndex}, ${parentCommentIndex === null ? index : parentCommentIndex})">Reply</p>
//             <form class="comment-form d-none" onsubmit="addComment(event, ${postIndex}, ${parentCommentIndex === null ? index : parentCommentIndex})">
//                 <div class="form-group">
//                     <textarea placeholder="Write a reply..." class="form-control" rows="2" required maxlength="200"></textarea>
//                     <small class="form-text text-muted">0/200 characters</small>
//                 </div>
//                 <button type="submit" class="btn btn-primary btn-sm">Reply</button>
//             </form>
//         </div>
//     `).join("");
// }

// // Function to handle form submission
// function handleSubmit(event) {
//     event.preventDefault();
//     const postContent = document.getElementById("postContent").value;
//     const postImage = document.getElementById("postImage").files[0]; // Get the uploaded image file
//     if (postContent.trim() !== "") {
//         const reader = new FileReader();
//         reader.onload = function() {
//             const imageDataURL = reader.result; // Get the base64 representation of the image
//             const newPost = { content: postContent, image: imageDataURL, votes: 0, comments: [], date: new Date().toISOString() };
//             posts.push(newPost);
//             displayPosts();
//             document.getElementById("postContent").value = "";
//             document.getElementById("postContentCounter").textContent = "0/500 characters";
//             document.getElementById("postImage").value = ""; // Clear the input file field
//         };
//         reader.readAsDataURL(postImage); // Read the image file as a data URL
//     }
// }

// // Function to handle upvoting
// function upvote(index) {
//     posts[index].votes++;
//     displayPosts();
// }

// // Function to handle downvoting
// function downvote(index) {
//     posts[index].votes--;
//     displayPosts();
// }

// // Function to handle adding comments
// function addComment(event, postIndex, parentCommentIndex) {
//     event.preventDefault();
//     const commentContent = event.target.querySelector("textarea").value;
//     if (commentContent.trim() !== "") {
//         const newComment = { content: commentContent, comments: [] };

//         if (parentCommentIndex === null) {
//             posts[postIndex].comments.push(newComment);
//         } else {
//             posts[postIndex].comments[parentCommentIndex].comments.push(newComment);
//         }

//         displayPosts();
//         event.target.querySelector("textarea").value = "";
//         event.target.querySelector("small").textContent = "0/200 characters";
//     }
// }

// // Function to show the comment form
// function showCommentForm(element, postIndex, parentCommentIndex = null) {
//     const commentForms = document.querySelectorAll(".comment-form");
//     commentForms.forEach(form => form.classList.add("d-none"));

//     const currentForm = element.nextElementSibling;
//     currentForm.classList.remove("d-none");
//     currentForm.querySelector("textarea").focus();
// }

// // Toggle visibility of the post form
// document.getElementById("toggleFormButton").addEventListener("click", function() {
//     const postForm = document.getElementById("postForm");
//     postForm.style.display = postForm.style.display === "none" ? "block" : "none";
// });

// // Event listener for form submission
// document.getElementById("postForm").addEventListener("submit", handleSubmit);

// // Event listener for sorting option change
// document.getElementById("sort").addEventListener("change", displayPosts);

// // Event listener for character counter
// document.getElementById("postContent").addEventListener("input", function() {
//     const maxLength = this.getAttribute("maxlength");
//     const currentLength = this.value.length;
//     document.getElementById("postContentCounter").textContent = `${currentLength}/${maxLength} characters`;
// });

// // Event listener for comment character counter
// document.querySelectorAll(".comment-form textarea").forEach(textarea => {
//     textarea.addEventListener("input", function() {
//         const maxLength = this.getAttribute("maxlength");
//         const currentLength = this.value.length;
//         this.nextElementSibling.textContent = `${currentLength}/${maxLength} characters`;
//     });
// });

// // Initial display of posts
// displayPosts();
// Variable to store posts


// Variable to store posts
let posts = [
    {
        content: "This is a sample post to get you started.",
        image: "https://via.placeholder.com/150", // Placeholder image URL
        votes: 5,
        comments: [
            {
                content: "Great post!",
                comments: []
            },
            {
                content: "I agree, very informative.",
                comments: [
                    {
                        content: "Thanks for the feedback!",
                        comments: []
                    }
                ]
            }
        ],
        date: new Date().toISOString()
    }
];

// Function to display posts
function displayPosts() {
    const sortOption = document.getElementById("sort").value;
    if (sortOption === "latest") {
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "rank") {
        posts.sort((a, b) => b.votes - a.votes);
    }

    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("card");
        postElement.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="vote" onclick="upvote(${index})"><i class="fas fa-arrow-up"></i></span>
                <span>${post.votes}</span>
                <span class="vote" onclick="downvote(${index})"><i class="fas fa-arrow-down"></i></span>
            </div>
            <div class="card-body">
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" class="post-image" alt="Post Image">` : ''}
                <div class="comments mt-3">
                    ${renderComments(post.comments, index)}
                </div>
                <p class="add-comment-link" onclick="showCommentForm(this, ${index})">Add a comment</p>
                <form class="comment-form d-none" onsubmit="addComment(event, ${index}, null)">
                    <div class="form-group">
                        <textarea placeholder="Write a comment..." class="form-control" rows="2" required maxlength="200"></textarea>
                        <small class="form-text text-muted">0/200 characters</small>
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">Comment</button>
                </form>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to render comments
function renderComments(comments, postIndex, parentCommentIndex = null) {
    return comments.map((comment, index) => `
        <div class="comment">
            <p>${comment.content}</p>
            <div class="comments">
                ${renderComments(comment.comments, postIndex, index)}
            </div>
            <p class="add-comment-link" onclick="showCommentForm(this, ${postIndex}, ${parentCommentIndex === null ? index : parentCommentIndex})">Reply</p>
            <form class="comment-form d-none" onsubmit="addComment(event, ${postIndex}, ${parentCommentIndex === null ? index : parentCommentIndex})">
                <div class="form-group">
                    <textarea placeholder="Write a reply..." class="form-control" rows="2" required maxlength="200"></textarea>
                    <small class="form-text text-muted">0/200 characters</small>
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Reply</button>
            </form>
        </div>
    `).join("");
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const postContent = document.getElementById("postContent").value;
    const postImage = document.getElementById("postImage").files[0]; // Get the uploaded image file
    if (postContent.trim() !== "") {
        const reader = new FileReader();
        reader.onload = function() {
            const imageDataURL = reader.result; // Get the base64 representation of the image
            const newPost = { content: postContent, image: imageDataURL, votes: 0, comments: [], date: new Date().toISOString() };
            posts.push(newPost);
            displayPosts();
            document.getElementById("postContent").value = "";
            document.getElementById("postContentCounter").textContent = "0/500 characters";
            document.getElementById("postImage").value = ""; // Clear the input file field
        };
        reader.readAsDataURL(postImage); // Read the image file as a data URL
    }
}

// Function to handle upvoting
function upvote(index) {
    posts[index].votes++;
    displayPosts();
}

// Function to handle downvoting
function downvote(index) {
    posts[index].votes--;
    displayPosts();
}

// Function to handle adding comments
function addComment(event, postIndex, parentCommentIndex) {
    event.preventDefault();
    const commentContent = event.target.querySelector("textarea").value;
    if (commentContent.trim() !== "") {
        const newComment = { content: commentContent, comments: [] };

        if (parentCommentIndex === null) {
            posts[postIndex].comments.push(newComment);
        } else {
            posts[postIndex].comments[parentCommentIndex].comments.push(newComment);
        }

        displayPosts();
        event.target.querySelector("textarea").value = "";
        event.target.querySelector("small").textContent = "0/200 characters";
    }
}

// Function to show the comment form
function showCommentForm(element, postIndex, parentCommentIndex = null) {
    const commentForms = document.querySelectorAll(".comment-form");
    commentForms.forEach(form => form.classList.add("d-none"));

    const currentForm = element.nextElementSibling;
    currentForm.classList.remove("d-none");
    currentForm.querySelector("textarea").focus();
}

// Event listener for form submission
document.getElementById("postForm").addEventListener("submit", handleSubmit);

// Event listener for sorting option change
document.getElementById("sort").addEventListener("change", displayPosts);

// Event listener for character counter
document.getElementById("postContent").addEventListener("input", function() {
    const maxLength = this.getAttribute("maxlength");
    const currentLength = this.value.length;
    document.getElementById("postContentCounter").textContent = `${currentLength}/${maxLength} characters`;
});

// Event listener for comment character counter
document.querySelectorAll(".comment-form textarea").forEach(textarea => {
    textarea.addEventListener("input", function() {
        const maxLength = this.getAttribute("maxlength");
        const currentLength = this.value.length;
        this.nextElementSibling.textContent = `${currentLength}/${maxLength} characters`;
    });
});

// Initial display of posts
displayPosts();

