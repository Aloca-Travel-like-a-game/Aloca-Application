export const convertDate = (ngayThangGMT: string): string[] => {
  const ngayThang = new Date(ngayThangGMT);

  if (isNaN(ngayThang.getTime())) {
    throw new Error('Không thể chuyển đổi ngày tháng');
  }

  const thu: string[] = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];
  const ngay: number = ngayThang.getUTCDate();
  const thang: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const nam: number = ngayThang.getUTCFullYear();

  return [
    thu[ngayThang.getUTCDay()],
    `${ngay}`,
    thang[ngayThang.getUTCMonth()],
    `${nam}`,
  ];
};


export const convertDatetoString = (date: Date) => {
  const stringDate = convertDate(
    new Date(date.getTime() + 24 * 60 * 60 * 1000).toDateString(),
  );
  return `${stringDate[1]}/${stringDate[2]}/${stringDate[3]}`;
};