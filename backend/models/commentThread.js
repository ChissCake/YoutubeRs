var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentThreadSchema = new Schema(
  {
    commentId: {type: String, required: true},
    text: {type: String, required: false},
    authorChannelId: {type: String, required: false},
    likeCount: {type: Number, required: true},
    totalReplyCount: {type: Number, required: true},
    nextPageToken: {type: String, required: false},
  }
);

// Virtual for comment thread's URL
CommentThreadSchema
.virtual('url')
.get(function () {
  return '/catalog/comment-thread/' + this._id;
});

//Export model
module.exports = mongoose.model('channel', CommentThreadSchema);
