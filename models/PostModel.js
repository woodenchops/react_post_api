const mongoose = require('mongoose');
const slugify = require('slugify');


const PostSchema = mongoose.Schema({
    slug: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean
    },
    image: {
        type: Object,
        trim: true
    },
    cta: {
        type: Object,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

PostSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower: true})
    next();
});

module.exports = mongoose.model('Posts', PostSchema);