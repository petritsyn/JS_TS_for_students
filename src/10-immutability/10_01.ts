export type UserType = {
    name: string
    hair: number
    address: {title: string, house?: number}
}

export type LaptopType = {
    title: string
}

export type UserWithLaptopType = UserType & {
    laptop: LaptopType
}

export type UserWithBooksType = {
    books: Array<string>
}

export type WithCompaniesType = {
    companies: Array<{id: number, title: string}>
}

export function makeHairStyle(u: UserType, power: number) {
    return {
        ...u,
        hair: u.hair / power
    }
}

export function moveUser(u: UserWithLaptopType, city: string) {
    return {
        ...u,
        address: {
            ...u,
            title: city
        }
    }
}

export function upgradeUserLaptop(u: UserWithLaptopType, laptop: string) {
    return {
        ...u,
        laptop: {...u.laptop, title: laptop}
    }
}

export function moveUserToOtherHouse(u: UserWithLaptopType & UserWithBooksType, house: number) {
    return {
        ...u,
        address: {...u.address, house: house}
    }
}

export function addBooksToUser(u: UserWithLaptopType & UserWithBooksType, books: Array<string>) {
    return {
        ...u,
        books: [...u.books, ...books]
    }
}

export function updateBookInUser(u: UserWithLaptopType & UserWithBooksType, oldBook: string, newBook: string) {
    return {
        ...u,
        books: u.books.map(el => el === oldBook ? newBook : el)
    }
}

export function removeBookInUser(u: UserWithLaptopType & UserWithBooksType, book: string) {
    return {
        ...u,
        books: u.books.filter(el => el !== book)
    }
}

export function updateUserCompany(u: WithCompaniesType, id: number, newCompany: string) {
    return {
        ...u,
        companies: u.companies.map(el => el.id === id ? {...el, title: newCompany} : el)
    }
}

export const changeUserCompany = (companies: {[key: string]: Array<{id: number, title: string}>},
                                  userName: string, companyId: number, newTitle: string) => {
    let companyCopy = {...companies};
    companyCopy[userName] = companyCopy[userName].map(el => el.id === companyId ? {...el, title: newTitle} : el);
    return companyCopy;
}