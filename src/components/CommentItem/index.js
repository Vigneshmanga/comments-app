import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {onDelete, details, onLike} = props
  const {username, comment, id, time, isLiked, backgroundColor} = details
  const likeTextCls = isLiked ? 'liked' : 'not-liked'
  const likeBtnUrl = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const onClickLikeBtn = () => {
    onLike(id)
  }

  const onClickDelete = () => {
    onDelete(id)
  }

  return (
    <li className="comment-card">
      <div className="profile-time-container">
        <div className={`profile-photo ${backgroundColor}`}>
          <p className="initial">{username[0]}</p>
        </div>
        <p className="username">{username}</p>
        <p className="time">{formatDistanceToNow(time)}</p>
      </div>
      <div className="comment-container">
        <p className="comment">{comment}</p>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img
            onClick={onClickLikeBtn}
            src={likeBtnUrl}
            className="like-btn"
            alt="like"
          />
          <button
            type="button"
            onClick={onClickLikeBtn}
            className={likeTextCls}
          >
            Like
          </button>
        </div>
        <button
          onClick={onClickDelete}
          type="button"
          className="delete-btn"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-btn"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
