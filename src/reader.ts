import * as XLSX from 'xlsx';

export interface CollegeData {
  collegeName: string;
  headName: string;
  position: string;
  contactNumber: string;
  email: string;
}

export function readCollegesFromExcel(filePath: string): CollegeData[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData.map((row: any) => ({
    collegeName: row['College Name'] || '',
    headName: row['Head Name'] || '',
    position: row['Position'] || '',
    contactNumber: row['Contact Number'] || '',
    email: row['Email'] || '',
  }));
}
