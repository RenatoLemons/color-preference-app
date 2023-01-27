import { AgeGroup } from "../interfaces/age-group";

const ageGroupDomains: AgeGroup[] = [
    { name: 'Less than 21', startAge: undefined, endAge: 20 },
    { name: 'From 21 to 40', startAge: 21, endAge: 40 },
    { name: 'From 41 to 60', startAge: 41, endAge: 60 },
    { name: 'From 61 to 80', startAge: 61, endAge: 80 },
    { name: 'From 81 to 100', startAge: 81, endAge: 100 },
    { name: 'Greater than 100', startAge: 101, endAge: undefined },
];

export { ageGroupDomains };