import style from "./comment.module.css"

export default function Comment(props){
    const comment = props.props
    console.log(comment)
    return (
        <div className={style.comment}>
            <div>{comment.author_username} zei:</div>
            <div>{comment.display_content}</div>
            <div className={style.removedcontent}>{comment.original_content}</div>
            <div>is premium?: {comment.is_author_premium_visible ? "ja" : "nee"}</div>
            <div>zwitsal?: {comment.author_is_newbie ? "ja" : "nee"}</div>
        </div>
    )
}

