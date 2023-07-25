var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VideoSchema = new Schema(
  {
    title: {type: String, required: true},
    videoId: {type: Number, required: true},
    commentThread: {type: Schema.Types.ObjectId, ref: 'CommentThread', required: true},
    description: {type: String, required: false},
    thumbnail: {type: String, required: false},
    commentCount: {type: Number, required: true},
  }
);

// Virtual for video's URL
VideoSchema
.virtual('url')
.get(function () {
  return '/catalog/video/' + this._id;
});

//Export model
module.exports = mongoose.model('channel', VideoSchema);
