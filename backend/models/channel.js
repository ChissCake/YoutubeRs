var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChannelSchema = new Schema(
  {
    channelName: {type: String, required: true},
    channelId: {type: Number, required: true},
    video: {type: Schema.Types.ObjectId, ref: 'Video', required: true},
    description: {type: String, required: false},
    image: {type: String, required: false},
    customUrl: [{type: String, required: true}]
  }
);

// Virtual for channel's URL
ChannelSchema
.virtual('url')
.get(function () {
  return '/catalog/channel/' + this._id;
});

//Export model
module.exports = mongoose.model('channel', ChannelSchema);
