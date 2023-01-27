import { ColorDomain } from "../interfaces/color-domain";

const colorsDomain: ColorDomain[] = [
    { name: 'Red', color: '#FF0000' },
    { name: 'Orange', color: '#FFa500' },
    { name: 'Yellow', color: '#FFff00' },
    { name: 'Green', color: '#008000' },
    { name: 'Blue', color: '#0000ff' },
    { name: 'Purple', color: '#800080' },
    { name: 'Pink', color: '#ffc0cb' },
    { name: 'Brown', color: '#a52a2a' },
    { name: 'Black', color: '#000000' },
    { name: 'Gray', color: '#808080' },
    { name: 'White', color: '#EDEDED' } // Almost white to prevent problems with background colors
];

var colorByName: { [index: string]: string } = {};
colorsDomain.forEach(colorDomain => {
    colorByName[colorDomain.name] = colorDomain.color;
});

export { colorsDomain, colorByName };