const Post = require("../model/PostModel")
const Tag = require("../model/TagModel")

exports.insert = [async(req, res)=>{
    
    const tags= [...req.body.tags]

    let tagIds=[]
    // Find whether the tag is in db or else create a new tag
    for(let i=0;i<tags.length;i++){
        let e=tags[i]
        console.log("Keyword "+ i, e);
        await Tag.findOne({keyword: e})
        .then(async(tag)=>{
            if(tag){
                tagIds = [...tagIds, tag._id]
                console.log("Existing Tag", tag._id);
            }
            else{
                const newTag = new Tag({
                    keyword: e
                })
                await newTag.save()
                .then((savenewTag)=>{
                    tagIds = [...tagIds, savenewTag._id]
                    console.log("New Tag", savenewTag._id);
                })
            }
        })
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: req.body.image,
        tags: [...tagIds]
    })
    post.save()
    .then((e)=>{
        res.send(e)
    })
}]

exports.findTags = [(req, res)=>{
    Tag.find()
    .then((tags)=>{
        res.send(tags)
    })
}]