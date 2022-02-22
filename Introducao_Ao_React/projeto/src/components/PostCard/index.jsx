export const PostCard = (porps) => {
    const { post } = porps
    return (
        <div className='post'>
            <div className='post-content'>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
            </div>
        </div>
    )
}