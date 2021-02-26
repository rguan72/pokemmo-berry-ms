import firebase from "./Firebase"

export class Data {
    constructor(uid) {
        this.db = firebase.firestore()
        this.uid = uid
    }
    hydrateData(querySnapshot) {
        const bushels = []
        querySnapshot.forEach((doc) => {
            const bushel = doc.data()
            bushel.plant_date = bushel.plant_date && bushel.plant_date.toDate()
            bushel.waterone_date = bushel.waterone_date && bushel.waterone_date.toDate()
            bushel.watertwo_date = bushel.watertwo_date && bushel.watertwo_date.toDate()
            bushel.harvest_date = bushel.harvest_date && bushel.harvest_date.toDate()
            bushel.id = doc.id
            bushels.push(bushel)
        })
        return bushels
    }
    watchBushels(setBushels) {
        return this.db.collection("bushels").where("uid", "==", this.uid).where("archived", "==", false).orderBy("plant_date", "desc")
                    .onSnapshot((querySnapshot) => {
                        setBushels(this.hydrateData(querySnapshot))
                    })
    }
    watchBushelsArchive(setBushels) {
        return this.db.collection("bushels").where("uid", "==", this.uid).where("archived", "==", true).orderBy("plant_date", "desc")
                    .onSnapshot((querySnapshot) => {
                        setBushels(this.hydrateData(querySnapshot))
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
            watertwo_date: null,
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
    getRanges(plantDate, waterOneGiven) {
        if (!plantDate) {
            return null
        }
        const locale = "en-US"
        const options = {month: 'numeric', day: 'numeric', hour: "2-digit", minute: "2-digit"}
        let waterOneTimeStart, waterOneTimeEnd, waterTwoTimeStart, waterTwoTimeEnd, harvestTimeStart, harvestTimeEnd
        switch (this.type) {
            case 16:
                waterOneTimeStart = this.t.addHours(plantDate, 4).toLocaleString(locale, options)
                waterOneTimeEnd = this.t.addHours(plantDate, 8).toLocaleString(locale, options)
                harvestTimeStart = this.t.addHours(plantDate, 16).toLocaleString(locale, options)
                harvestTimeEnd = this.t.addHours(plantDate, 24).toLocaleString(locale, options)
                return { waterOneTimeStart, waterOneTimeEnd, harvestTimeStart, harvestTimeEnd }
            case 20:
                waterOneTimeStart = this.t.addHours(plantDate, 6).toLocaleString(locale, options)
                waterOneTimeEnd = this.t.addHours(plantDate, 8).toLocaleString(locale, options)
                if (waterOneGiven) {
                    waterTwoTimeStart = this.t.addHours(waterOneGiven, 2).toLocaleString(locale, options)
                    waterTwoTimeEnd = this.t.addHours(waterOneGiven, 12).toLocaleString(locale, options)
                } else {
                    waterTwoTimeStart = this.t.addHours(plantDate, 14).toLocaleString(locale, options)
                    waterTwoTimeEnd = this.t.addHours(plantDate, 18).toLocaleString(locale, options)
                }
                harvestTimeStart = this.t.addHours(plantDate, 20).toLocaleString(locale, options)
                harvestTimeEnd = this.t.addHours(plantDate, 28).toLocaleString(locale, options)
                return { waterOneTimeStart, waterOneTimeEnd, waterTwoTimeStart, waterTwoTimeEnd, harvestTimeStart, harvestTimeEnd }
            default:
                return null
        }
    }
}