const pantryModel = require('../models/pantryItemModel')
const categoryModel = require('../models/categoryModel')
const categoryItemModel = require('../models/categoryItemModel')
const userModel = require('../models/userModel')

module.exports = io => {

    class hardwareController {
        static newItem = async (req, res) => {
            let inputs = req.body
            let itemByUID = await pantryModel.findByUID(inputs.UID)
            if (await this.checkPin(inputs.pin, inputs.userID) && !itemByUID) {
                let categoryIDArr = await categoryModel.newEntry({ category: inputs.category, userID: inputs.userID })
                let pantryItemIDArr = await pantryModel.newEntry({ itemName: inputs.itemName, UID: inputs.UID })
                await categoryItemModel.newEntry({ categoryID: categoryIDArr[0], itemID: pantryItemIDArr[0] })
                //Insert socket emit here. The socket emission should update users front end view with new item
                io.in(`room-${inputs.userID}`).emit('new-item', {
                    itemName: inputs.itemName,
                    category: inputs.category
                });
                res.json({ status: "Success" })
            } else {
                res.json({ status: "Error" })
            }
        }

        static removeItem = async (req, res) => {
            let inputs = req.body
            if (await this.checkPin(inputs.pin, inputs.userID)) {
                let itemToRemoveArr = await pantryModel.removeEntry(inputs.userID, inputs.UID)
                if (itemToRemoveArr.length > 0) {
                    pantryModel.delete(itemToRemoveArr[0].id)
                    categoryModel.delete(itemToRemoveArr[0].catID)
                    res.json({ status: "Success" })
                } else {
                    res.json({ status: "Error" })
                }
            } else {
                res.json({ status: "Error" })
            }
        }

        static checkPin = async (pin, userID) => {
            let userArr = await userModel.findByID(userID)
            if (userArr[0].hardwarePin === parseInt(pin)) {
                return true
            }
            return false
        }
    }
    return hardwareController
}