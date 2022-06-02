import {
    addBooksToUser, changeUserCompany,
    makeHairStyle,
    moveUser,
    moveUserToOtherHouse, removeBookInUser, updateBookInUser, updateUserCompany,
    upgradeUserLaptop,
    UserType,
    UserWithBooksType,
    UserWithLaptopType, WithCompaniesType
} from "./10_01";

test('reference type test', () => {
    let user: UserType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 12}
    }

    const cutUser = makeHairStyle(user, 2);

    expect(cutUser.hair).toBe(10);
    expect(user.hair).toBe(20)
})

test('change address', () => {
    let user: UserWithLaptopType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'}
    }

    const movedUser = moveUser(user, 'Moscow');

    expect(movedUser.address.title).toBe('Moscow');
    expect(movedUser).not.toBe(user);
    expect(movedUser.laptop).toBe(user.laptop)
})

test('upgrade laptop to macbook', () => {
    let user: UserWithLaptopType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'}
    }

    const upgradeLaptop = upgradeUserLaptop(user, 'Macbook');

    expect(upgradeLaptop.laptop).not.toBe(user.laptop);
    expect(upgradeLaptop.laptop.title).toBe('Macbook');
    expect(user.laptop.title).toBe('ZenBook');
})

test('move user to other house', () => {
    let user: UserWithLaptopType & UserWithBooksType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'},
        books: ['html', 'css', 'js']
    }

    const movedToOtherHouse = moveUserToOtherHouse(user, 99);

    expect(movedToOtherHouse.address.house).not.toBe(user.address.house);
    expect(movedToOtherHouse.address.house).toBe(99);
    expect(movedToOtherHouse.books).toBe(movedToOtherHouse.books);
})

test('add new books to user', () => {
    let user: UserWithLaptopType & UserWithBooksType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'},
        books: ['html', 'css', 'js']
    }

    const addedBooks = addBooksToUser(user, ['react']);

    expect(addedBooks.books).not.toBe(user.books);
    expect(addedBooks.books[3]).toBe('react');
})

test('update js to ts', () => {
    let user: UserWithLaptopType & UserWithBooksType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'},
        books: ['html', 'css', 'js']
    }

    const updatedBook = updateBookInUser(user, 'js', 'ts');

    expect(updatedBook.books).not.toBe(user.books);
    expect(updatedBook.books[2]).toBe('ts');
})

test('remove book', () => {
    let user: UserWithLaptopType & WithCompaniesType = {
        name: 'Andrey',
        hair: 20,
        address: {title: 'Rostov', house: 15},
        laptop: {title: 'ZenBook'},
        companies: [{id: 1, title: 'гугл'}, {id: 2, title: 'Yandex'}]
    }

    const updatedCompany = updateUserCompany(user, 1, 'Google') as UserWithLaptopType & WithCompaniesType;

    expect(updatedCompany.companies).not.toBe(user.companies);
    expect(updatedCompany.companies[0].title).toBe('Google');
    expect(updatedCompany.companies.length).toBe(2);
})

test('change company', () => {
    let companies = {
        'Andrew': [{id: 1, title: 'гугл'}, {id: 2, title: 'Yandex'}],
        'Anna': [{id: 2, title: 'Mail'}]
    }

    let changedCompany = changeUserCompany(companies, 'Andrew', 1, 'Google');

    expect(changedCompany['Andrew']).not.toBe(companies['Andrew']);
    expect(changedCompany['Andrew'][0].title).toBe('Google');
})