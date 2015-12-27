var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

// example video:
// var video = {
//     "videoTitle": "Cool Vid",
//     "videoId": "someId",
//     "youtubeObj": { someObj }
// };

var videoSchema = new Schema({
    videoTitle: { type: String },
    videoId: { type: String },
    youtubeObj: Schema.Types.Mixed
});

var videos = Mongoose.model('videos', videoSchema);

module.exports = {
    videos: videos
};