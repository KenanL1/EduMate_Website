document.addEventListener('DOMContentLoaded', function() {
    console.log(f)
    document.querySelector('#add').addEventListener('click', () => add_post());
    get_post();
});

function get_post(){
    fetch(`/posts/${f}`)
    .then(response => response.json())
    .then(posts => {
        
        // Print posts
        console.log(posts);
        posts.forEach(display_post);
    })
    .catch(e => console.log(e));
}

function display_post(posts)
{
    const post = document.createElement('div');
    post.className = 'post border';

    const user = document.createElement('h5');
  const body = document.createElement('p');
  const b = document.createElement('br');

  user.innerHTML = `${posts.user}`;
  body.innerHTML = `${posts.discuss} <br> ${posts.timestamp}`;

  post.append(user);
  post.append(body);

  // Add post to DOM
  document.querySelector('#posts').appendChild(post);
  document.querySelector('#posts').appendChild(b);
}

function add_post(){
    console.log(document.querySelector('#post-body').value);
    fetch(`/new_post/${f}`,{
        method: 'POST',
        body: JSON.stringify({
            post: document.querySelector('#post-body').value
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        alert('Post Sentz');
    })
    .catch(e => console.log(e));
}

