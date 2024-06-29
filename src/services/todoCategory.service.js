import db from '../modules/index.js'
const { todoCategory:TodoCategory } = db

const todoCateg=(payload)=>{
    try {
        console.log(payload)
    } catch (error) {
        throw error
    }
}

export default todoCateg 

