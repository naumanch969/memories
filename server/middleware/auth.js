import jwt, { decode } from "jsonwebtoken"

// i think the only purpose of middleware is
// to get the token and get the id of the user by decoding token

export const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(404).json({ message: "invalid user. Please sign in to do something with memory" })
        const token = await req.headers.authorization.split(" ")[1];
        const isCustomToken = token.length < 500;

        let decodedData;

        if (token && isCustomToken) {
            decodedData = jwt.verify(token, "secret")
            req.userId = decodedData?.id;                   // now we can get userId by req.userId
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;    //sub is specific id that differentiate every google user
        }
    } catch (error) {
        console.log("error in auth middleware", error)
    }
    next()
}

