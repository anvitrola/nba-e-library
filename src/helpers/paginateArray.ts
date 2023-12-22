export function paginateArray<T>(array: T[], pageSize: number) {
    return array.reduce((acc: any, item, index) => {
        const pageIndex = Math.floor(index / pageSize);

        if (!acc[pageIndex]) {
            acc[pageIndex] = [];
        }

        acc[pageIndex].push(item);

        return acc;
    }, []);
}