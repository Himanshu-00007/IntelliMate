const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { clerkId, name, email} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({
      clerkId,
      name,
      email,
    });

    await newUser.save();

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const saveChat=async (req,res)=>{
  try{
    const {clerkId,question,answer}=req.body;
    const user=await User.findOne({clerkId});
    if(!user)
    {
      return res.status(404).json({message:"user not found"});
    }
    user.chatHistory.push({question,answer});
    await user.save();
    return res.status(200).json({message:"chat saved successfully"});
  }
  catch(err)
  {
    console.error("error saving chat",err);
    return res.status(500).json({message:"something went wrong"});
  }
}
const getChatHistory = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ chatHistory: user.chatHistory });
  } catch (error) {
    console.error("Error fetching chat history", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteChat = async (req, res) => {
  try {
    const { clerkId, chatId } = req.params;

    // 1. Find the user
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // 2. Find the index of the chat to delete
    const chatIndex = user.chatHistory.findIndex(
      chat => chat._id.toString() === chatId
    );

    if (chatIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Chat message not found"
      });
    }

    // 3. Remove the chat using splice
    user.chatHistory.splice(chatIndex, 1);
    
    // 4. Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      chats: user.chatHistory
    });

  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the chat"
    });
  }
};


module.exports = { createUser, saveChat, getChatHistory,deleteChat };

