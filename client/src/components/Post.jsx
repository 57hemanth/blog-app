export default function Post({title, description, author, image, date}) {

    const URL = import.meta.env.VITE_API_URL

    return(
        <div className="post">
            <div className="img-container">
                <img className="post-img" src={`${URL}/${image}`}></img>
            </div>
            <div className="post-details">
                <p className="post-title">{title}</p>
                <p className="postedby">By <span className="author">{author}</span> • <span className="uploaded-date">{date}</span></p>
                <p className="post-description">{description}</p>
            </div>
        </div>
    )
}