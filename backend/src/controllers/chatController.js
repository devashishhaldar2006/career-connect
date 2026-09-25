import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res){
    try {
        //use clerk id for stream not mongodb id =?>>it should match the id we have in stream dashboard
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userImage: req.user.profileImage || req.user.image || "",
            userName: req.user.name || "Anonymous User"
        });
    } catch (error) {
        console.error("Error in getStreamToken controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}