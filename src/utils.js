import firebase from "./Firebase"

export class Data {
    constructor(uid) {
        this.db = firebase.firestore()
        this.uid = uid
    }
    watchBushels(setBushels) {
        return this.db.collection("bushels").where("uid", "==", this.uid)
                    .onSnapshot((querySnapshot) => {
                        const bushels = []
                        querySnapshot.forEach((doc) => {
                            const bushel = doc.data()
                            bushel.plant_date = bushel.plant_date && bushel.plant_date.toDate()
                            bushel.id = doc.id
                            bushels.push(bushel)
                        })
                        setBushels(bushels)
                    })
    }
    updateBushel(id, fieldUpdate) {
        this.db.collection("bushels").doc(id).update(fieldUpdate)
    }
}