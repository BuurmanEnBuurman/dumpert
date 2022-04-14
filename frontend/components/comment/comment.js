import Image from "next/image";
import { useState } from "react";
import style from "./comment.module.css";

export default function Comment(props) {
  const [ShowMetaData, SetShowMetaData] = useState();
  const comment = props.props;
  return (
    <div className={style.comment}>
      <div>{comment.author_username} zei:</div>
      <div>{comment.display_content}</div>
      <div className={style.removedcontent}>{comment.original_content}</div>

      <Image
        onMouseOut={() => SetShowMetaData(false)}
        onMouseEnter={() => SetShowMetaData(true)}
        className={style.helpbutton}
        height={15}
        width={15}
        src="/question.svg"
      />

      {ShowMetaData && (
        <div className={style.metadatabox}>
          <div>
            is premium?: {comment.is_author_premium_visible ? "ja" : "nee"}
          </div>
          <div>zwitsal?: {comment.author_is_newbie ? "ja" : "nee"}</div>
          <div>moderated?: {comment.aproved ? "ja" : "nee"}</div>
          <div>reports: {comment.report_count}</div>
          <div>reacties: {comment.child_comments.length}</div>
          <div>banned? {comment.banned ? "ja" : "nee"}</div>
          <div>kuddos? {comment.kudos_count}</div>

        </div>
      )}

    </div>
  );
}
