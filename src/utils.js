export const sortData = (data) => {
    
    // Copy data into array
    const sortedData = [...data];

    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
    
}