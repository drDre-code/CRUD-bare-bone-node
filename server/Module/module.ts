
import { Info, writeDataToFile } from '../util'
let DATA: Info[] = require('../../data/database');


export function findAllData(): Promise<Info[]> {
    return new Promise((resolve, reject) => {
        resolve(DATA)
    })
}

export function findDataById(id: number): Promise<Info | undefined> {
    const individualData = DATA.find((x: Info) => x.id === id)
    return new Promise((resolve, reject) => {
        resolve(individualData)
    })
}

export function create(userData: Info): Promise<Info | undefined> {
    return new Promise((resolve, reject) => {
        const newData = { id: id(), ...userData }
        DATA.push(newData)
        writeDataToFile('./data/database.json', DATA)
        resolve(newData)
    })
}

export function update(id: number, userData: Info): Promise<Info | undefined> {
    return new Promise((resolve, reject) => {
        const index = DATA.findIndex((x: Info) => x.id === id)
        DATA[index] = { id, ...userData }
        writeDataToFile('./data/database.json', DATA)
        resolve(DATA[index])
    })
}

export function deleteUser(id: number): Promise<Info | null> {
    return new Promise((resolve, reject) => {
        DATA = DATA.filter((x: Info) => x.id !== id)
        writeDataToFile('./data/database.json', DATA)
        resolve(null)
    })
}






function id() {
    let id;
    if (DATA.length === 0) {
        id = 1
    } else {
        id = Number((DATA[DATA.length - 1]).id) + 1
    }
    return id
}