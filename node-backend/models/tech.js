
const mongoose = require('mongoose');

const techSchema = new mongoose.Schema({

    
    
    taskName: {
        type: String,
        required: true,
    },
        
    
    
    is_completed: {
        type: Boolean,
        required: true,
        default: false  
    },
});

module.exports = mongoose.model('tech',techSchema);


    

    