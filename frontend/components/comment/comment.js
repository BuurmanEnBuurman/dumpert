import style from "./comment.module.css"

export default function Comment(props){
    const comment = props.props
    // console.log(comment)
    return (
        <div className={style.comment}>
            <div>{comment.author_username}</div>
            <div>{comment.display_content}</div>
            <div>{comment.content}</div>
        </div>
    )
}

