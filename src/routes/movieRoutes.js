import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    // users.create()
    res.json({message: "hello"});
});

router.post("/hello", (req, res) => {
    res.json({message: "hello"});
});


export default router;