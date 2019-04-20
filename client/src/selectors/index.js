export const selectItems = (items) => {
    const sorted = items.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
    return sorted;
};

export default selectItems;