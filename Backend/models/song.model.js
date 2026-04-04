import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
 url:{
      type: String,
      required: [true, "URL is required"],
      unique: true
 },
 posterUrl: { 
      type: String,
      required: [true, "Poster URL is required"],
 },
  title: {
        type: String,
        required: [true, "Title is required"],
  },
  mood:{
        type: String,
        required: [true, "Mood is required"],
        enum: ["Happy", "Sad","Surprised","Angry"]
  }
});

export const songModel = mongoose.model("Song", songSchema);