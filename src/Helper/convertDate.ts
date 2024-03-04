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
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
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
  return `${stringDate[1]} ${stringDate[2]}/${stringDate[3]}`;
};