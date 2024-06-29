const todoCategory = (req, res) => {
    try {
        res.json({ message: "hi" })
    } catch (error) {
        return res.json({ message: "error" })
    }
}


export default todoCategory