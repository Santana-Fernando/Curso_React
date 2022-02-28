export const PostCard = (props) => {
    const {id, title} = props.post
    return (
        <div className='post'>
            <div className='post-content'>
                <h1>{id}</h1>
                <p>{title}</p>
            </div>
        </div>
    )
}