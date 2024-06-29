const mongoose=require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String, required: true},
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        reference: "Tag"
    }]
}, {timestamps: true})

const PostModel = mongoose.model("Post", PostSchema)

module.exports = PostModel