import { jobs, aspirations, likes, childcount, kidsage, extras } from './options'
import { FemaleChild, MaleChild, FemaleAdult, MaleAdult, FemaleElderly, MaleElderly } from './options/names'

const pick = elements => {
    let weighted = [];
    elements.map(e => {
        for(let x = 0; x < parseFloat(e.percentage); x++) {
            weighted.push(e.name);
        }
    });
    return weighted[Math.floor(Math.random() * weighted.length)];
}

const generate_male = name_list => {
    return {gender: 'Male', name: pick(name_list), job: pick(jobs), aspirations: pick(aspirations), likes: pick(likes)};
}

const generate_female = name_list => {
    return {gender: 'Female', name: pick(name_list), job: pick(jobs), aspirations: pick(aspirations), likes: pick(likes)};
}

const generate_kids = () => {
    let kids = [null, null, null, null, null];
    for(let x = 0; x < pick(childcount); x++) {
        kids.shift();
        const age = pick(kidsage);
        const gender = pick([{name: 'Male', percentage: 1}, {name: 'Female', percentage: 1}]);
        const name = gender.toLowerCase() === 'male' ? pick(MaleChild) : pick(FemaleChild);
        kids.push({
            image: `${gender.toLowerCase()}_${age.toLowerCase()}.png`,
            age,
            gender,
            name,
            title: gender.toLowerCase() === 'male' ? 'Son' : 'Daughter',
        });
    }
    return kids;
}

const generate_parents = () => {
    const percent = Math.floor(Math.random() * (100 - 1) + 1);
    let male1 = generate_male(MaleAdult);
    let male2 = generate_male(MaleAdult);
    male1.title = 'Dad';
    male1.image = 'dad.png';
    male2.title = 'Dad';
    male2.image = 'dad.png';
    let female1 = generate_female(FemaleAdult);
    let female2 = generate_female(FemaleAdult);
    female1.title = 'Mom';
    female1.image = 'mom.png';
    female2.title = 'Mom';
    female2.image = 'mom.png';
    if(percent <= 50) {
        // 50% chance to get mom/dad
        return [
            female1,
            male1
        ];
    } else if(percent > 50 && percent <= 60) {
        // 10% chance to get mom/mom
        return [
            female1,
            female2,
        ];
    } else if(percent > 60 && percent <= 70) {
        // 10% chance to get dad/dad
        return [
            male1,
            male2
        ];
    } else if(percent > 70 && percent <= 80) {
        // 10% chance to get single dad
        return [
            male1,
            null
        ];
    } else if(percent > 50 && percent <= 60) {
        // 10% chance to single mom
        return [
            female1,
            null
        ];
    } else {
        // 10% chance to get no parents
        return [null, null];
    }
}

const generate_grandparent = () => {
    const percent = Math.floor(Math.random() * (100 - 1) + 1);
    if(percent <= 33) {
        let person = generate_male(MaleElderly);
        person.title = 'Grandfather';
        person.image = 'grandfather.png';
        return person;
    } else if(percent > 33 && percent <= 66) {
        let person = generate_female(FemaleElderly);
        person.title = 'Grandmother';
        person.image = 'grandmother.png';
        return person;
    } else {
        return null;
    }
}

const generate_pet = () => {
    const pet = {name: pick([{name: 'Dog', percentage: 33, image: 'dog.png'}, {name: 'Cat', percentage: 33, image: 'cat.png'}, {name: 'None', percentage: 33}])};
    switch(pet.name) {
        case 'Dog':
            pet.image = 'dog.png';
            break;
        case 'Cat':
            pet.image = 'cat.png';
            break;
        default:
            pet.image = null;
    }
    if(pet.name === 'None') {
        return null;
    }
    return pet;
}

const generator = {
    run() {
        return {
            parents: generate_parents(),
            kids: generate_kids(),
            grandparent: generate_grandparent(),
            pet: generate_pet(),
            extra: pick(extras)

        }
    }
}

export default generator;