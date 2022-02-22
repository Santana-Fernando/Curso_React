export const loadPosts = async () => {
    let posts = {}
    //const postsResponse = fetch('https://jsonplaceholder.typicode.com/todos')
    await fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => posts = json)

    return posts
}