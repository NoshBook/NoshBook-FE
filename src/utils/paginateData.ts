export default function paginateData(
  sourceData: Array<any>,
  itemsPerPage: number,
  currentPaginatedData: Array<any> = []
): Array<Array<any>> {
  let newCurrentPaginatedData: Array<any> = [...currentPaginatedData];
  const newSourceData = [...sourceData];

  // stop condition
  if (newSourceData.length - 1 < itemsPerPage)
    return [...newCurrentPaginatedData, newSourceData];

  const newPageData = newSourceData.splice(0, itemsPerPage);
  newCurrentPaginatedData = [...newCurrentPaginatedData, newPageData];

  return paginateData(newSourceData, itemsPerPage, newCurrentPaginatedData);
}
