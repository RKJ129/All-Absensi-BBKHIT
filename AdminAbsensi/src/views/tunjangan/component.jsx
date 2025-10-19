import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import TableChartIcon from '@mui/icons-material/TableChart';
import { green } from '@mui/material/colors';




export const ExportExcelTunjangan = ({ data, fileName }) => {
    let dates = Array.from({ length: 30 }).map((_, i) => `${i + 1}`);
    const headers = ['Nama', ...dates, 'Hadir', 'Terlambat', 'Pulang Sebelum Waktunya', 'Izin', 'Sakit', 'Absen', 'Potongan'];
    console.log('Data Tunjangan : ', data);
    const getFormat = (date) => {
        return new Date(date);
    }
    
    const types = {
        LATE: 'TL',
        LATE_EARLY: 'PSW',
        EXCUSED: 'IZIN',
        SICK: 'SAD',
        ABSENT: 'ABS'
    }

    const sheetData = [];

    data.forEach(tunjangan => {
        const result = [];

        result.push(tunjangan.username); //masukkan nama
        dates.forEach(date => {
            const attendance = tunjangan.attendances?.find(
                att => getFormat(att.date).getDate() === Number(date)
            );

            if(attendance) {
                let status = [];
                attendance.attendanceLocation?.forEach(loc => {
                    if(types[loc.status]) {
                        status.push(types[loc.status]);
                    }
                });

                result.push(status.join(', '));
            } else {
                result.push('');
            }
        });

        const summary = tunjangan.summary;
        result.push(
            summary.PRESENT, 
            summary.LATE, 
            summary.LEFT_EARLY, 
            summary.EXCUSED, 
            summary.SICK, 
            summary.ABSENT);

        //  Potongan : 
        const potongan = ((summary.LATE + summary.LEFT_EARLY) * 2) 
            + (summary.ABSENT * 4) 
            + (summary.EXCUSED * 4) 
            + (summary.SICK * 2);

        result.push(potongan);

        sheetData.push(result);

    });

    console.log('Sheet Data Tunjangan : ', sheetData);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...sheetData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/actet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    }

    return (
        <Button
            variant='contained'
            size='small' 
            onClick={exportToExcel}
            startIcon={<TableChartIcon />}
            sx={{
                backgroundColor: green[400],
                '&:hover': {
                backgroundColor: green[600]
                },
                fontSize: '11px',
                '& .MuiButton-startIcon': {
                fontSize: '16px', // ukuran icon
                },
            }}
        >
            Excel
        </Button>
    )
}