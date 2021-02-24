import firebase from "./Firebase"

export class Data {
    constructor(uid) {
        this.db = firebase.firestore()
        this.uid = uid
    }
    watchBushels(setBushels) {
        return this.db.collection("bushels").where("uid", "==", this.uid).where("archived", "==", false).orderBy("plant_date")
                    .onSnapshot((querySnapshot) => {
                        const bushels = []
                        querySnapshot.forEach((doc) => {
                            const bushel = doc.data()
                            bushel.plant_date = bushel.plant_date && bushel.plant_date.toDate()
                            bushel.waterone_date = bushel.waterone_date && bushel.waterone_date.toDate()
                            bushel.harvest_date = bushel.harvest_date && bushel.harvest_date.toDate()
                            bushel.id = doc.id
                            bushels.push(bushel)
                        })
                        setBushels(bushels)
                    })
    }
    updateBushel(id, fieldUpdate) {
        this.db.collection("bushels").doc(id).update(fieldUpdate)
    }
    createBushel(uid, plantDate, berry, number) {
        this.db.collection("bushels").doc().set({
            title: berry,
            uid: uid,
            plant_date: plantDate,
            waterone_date: null,
            harvest_date: null,
            number: number,
            archived: false,
        })
    }
}

export class Time {
    addHours(date, hours) {
        const newDate = new Date(date)
        newDate.setTime(newDate.getTime() + hours * 60 * 60 * 1000)
        return newDate
    }
}

export class BerryMath {
    constructor(title) {
        switch (title) {
            case "rawst":
                this.type = 16
                break
            case "cheri":
                this.type = 16
                break
            case "pecha":
                this.type = 16
                break
            case "leppa":
                this.type = 20
                break
            default:
                this.type = 0
                break
        }
        this.t = new Time()
    }
    getRanges(plantDate) {
        if (!plantDate) {
            return null
        }
        const locale = "en-US"
        const options = {month: 'numeric', day: 'numeric', hour: "2-digit", minute: "2-digit"}
        switch (this.type) {
            case 16:
                const waterOneTimeStart = this.t.addHours(plantDate, 4).toLocaleString(locale, options)
                const waterOneTimeEnd = this.t.addHours(plantDate, 8).toLocaleString(locale, options)
                const harvestTimeStart = this.t.addHours(plantDate, 16).toLocaleString(locale, options)
                const harvestTimeEnd = this.t.addHours(plantDate, 24).toLocaleString(locale, options)
                return { waterOneTimeStart, waterOneTimeEnd, harvestTimeStart, harvestTimeEnd }
            default:
                return null
        }
    }
}