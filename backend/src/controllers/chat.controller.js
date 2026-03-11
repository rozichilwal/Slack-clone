import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = generateStreamToken(req.auth.userId)

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error generating Stream Token", error);
    res.status(500).json({
      message: "Failed to generate Stream token",
    });
  }
};

// import { generateStreamToken } from "../config/stream.js";

// export const getStreamToken=async(req,res)=>{
//     try {
//         const token=generateStreamToken(req.auth().userId);

//         res.status(200).json({token});
//     } catch (error) {
//         console.log("Error generating Stream Token",error);
//         res.status(500).json({
//             message:"Failed to generate Stream token",
//         });
        
//     }
// };