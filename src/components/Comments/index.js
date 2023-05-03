import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  onTypingName = event => {
    this.setState({name: event.target.value})
  }

  onTypingComment = event => {
    this.setState({comment: event.target.value})
  }

  onLike = uniqueId => {
    const {commentsList} = this.state
    const commentsListCopy = [...commentsList]
    const newCommentsList = commentsListCopy.map(each => {
      if (each.id === uniqueId) {
        return {...each, isLiked: !each.isLiked}
      }
      return each
    })
    this.setState({commentsList: newCommentsList})
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {name, comment, commentsList} = this.state
    if (name !== '' && comment !== '') {
      const time = new Date()
      const backgroundColor =
        initialContainerBackgroundClassNames[
          commentsList.length % initialContainerBackgroundClassNames.length
        ]
      const newComment = {
        id: uuidv4(),
        username: name,
        comment,
        time,
        isLiked: false,
        backgroundColor,
      }
      this.setState(prevState => ({
        name: '',
        comment: '',
        commentsList: [...prevState.commentsList, newComment],
      }))
    }
  }

  onDelete = uniqueId => {
    this.setState(prevState => {
      const newList = prevState.commentsList.filter(
        each => each.id !== uniqueId,
      )
      return {commentsList: newList}
    })
  }

  render() {
    const {name, comment, commentsList, backgroundColor} = this.state
    return (
      <div className="main-container">
        <div className="test">
          <div className="bg-container">
            <div className="input-image-container">
              <div className="input-container">
                <form className="input-container" onSubmit={this.onSubmitEvent}>
                  <h1 className="comments-heading">Comments</h1>
                  <p className="description">
                    Say something about 4.O Technologies
                  </p>
                  <input
                    onChange={this.onTypingName}
                    value={name}
                    type="input"
                    className="name-input"
                    placeholder="Your Name"
                  />
                  <textarea
                    onChange={this.onTypingComment}
                    value={comment}
                    className="textarea-input-el"
                    placeholder="Your Comment"
                    rows="5"
                    cols="30"
                  >
                    {comment}
                  </textarea>
                  <button className="submit-btn" type="submit">
                    Add Comment
                  </button>
                </form>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                  alt="comments"
                  className="image"
                />
              </div>
            </div>
          </div>
          <p className="comments-count">
            <span className="count">{`${commentsList.length} `}</span>Comments
          </p>
          <ul className="comments-container">
            {commentsList.map(each => {
              console.log('a')
              return (
                <CommentItem
                  backgroundColor={backgroundColor}
                  onDelete={this.onDelete}
                  onLike={this.onLike}
                  details={each}
                  key={each.id}
                />
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
