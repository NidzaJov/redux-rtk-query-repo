export const returnSequenceFromArray = (indexOfElement, array, sequenceLength) => {
    let sequence;
    if (indexOfElement > (array.length - sequenceLength)) {
        sequence = array.slice(indexOfElement, array.length).concat(array.slice(0, (4 - (array.length - indexOfElement))));
    } else {
        sequence = array.slice(indexOfElement, indexOfElement + sequenceLength)
    } 
    return sequence;
}