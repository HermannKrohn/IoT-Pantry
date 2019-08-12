const pantryModel = require('../models/pantryItemModel')
const categoryModel = require('../models/categoryModel')
const categoryItemModel = require('../models/categoryItemModel')
const userModel = require('../models/userModel')

class hardwareController{
    static newItem = async (req, res) => {
        let inputs = req.body
        if(await this.checkPin(inputs.pin, inputs.userID)){
            let categoryIDArr = await categoryModel.newEntry({category: inputs.category, userID: inputs.userID})
            let pantryItemIDArr = await pantryModel.newEntry({itemName: inputs.itemName})
            await categoryItemModel.newEntry({categoryID: categoryIDArr[0], itemID: pantryItemIDArr[0]})
            //Insert socket emit here. The socket emission should update users front end view with new item
            res.json({status: "Success"})
        }else{
            res.json({status: "Error"})
        }
    }

    static checkPin = async (pin, userID) => {
        let userArr = await userModel.findByID(userID)
        if(userArr[0].hardwarePin === parseInt(pin)){
            return true
        }
        return false
    }
}

module.exports = hardwareController