function format_comment(comment) {
  delete comment.html_markup;
  delete comment.article_link;
  delete comment.article_title;
  delete comment.parent_id;
  delete comment.reference_id; // is always 0 so not used
  delete comment.parent_id; // is always 0 so not used

  comment.child_comments.forEach((element) => {
    // format sub comments
    delete element.html_markup;
    delete element.article_link;
    delete element.article_title;
    delete element.parent_id;
    delete element.reference_id; // is always 0 so not used
    delete element.parent_id; // is always 0 so not used
  });

  return comment;
}

module.exports = format_comment;