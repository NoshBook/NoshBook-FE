import paginateData from './paginateData';

it('converts the contents of an even-length array into sub-arrays at a specified even-length per sub array', () => {
  const mockBulkData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const actual = paginateData(mockBulkData, 2);
  const expected = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ];
  expect(actual).toEqual(expected);
});

it('converts the contents of an even-length array into sub-arrays at a specified odd-length per sub array', () => {
  const mockBulkData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const actual = paginateData(mockBulkData, 3);
  const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
  expect(actual).toEqual(expected);
});

it('converts the contents of an odd-length array into sub-arrays at a specified even-length per sub array', () => {
  const mockBulkData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const actual = paginateData(mockBulkData, 2);
  const expected = [[1, 2], [3, 4], [5, 6], [7, 8], [9]];
  expect(actual).toEqual(expected);
});
