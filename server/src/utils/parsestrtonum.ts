export const parsestrtonum = (str: any) => {
    if (!str) {
        return 0;
    }
    const num = Number(str);
    if (Number.isNaN(num)) {
        return 0;
    }
    return num;
};
