import express from 'express'

const router = express.Router();

router.get('/signUp', (req,res)=>{
    res.send("sign Up");
})
router.get('/login', (req,res)=>{
    res.send("login");
})
router.get('/logout', (req,res)=>{
    res.send("logout");
})



export default router;