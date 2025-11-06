import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import Button from '@mui/material/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TableChartIcon from '@mui/icons-material/TableChart';
import { red, lightGreen, green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';

const headers = ['Hari', 'Tanggal', 'Jam', 'Tipe', 'Status', 'Koordinat'];

// const manipulateData

export const ExcelExport = ({ data, fileName }) => {

    const sheetData = [];

    data.forEach(user => {
        sheetData.push([user.name]);

        user.records.forEach(rec => {
            sheetData.push([
                rec.hari,
                rec.tanggal,
                rec.jam,
                rec.tipe,
                rec.status,
                rec.koordinat,
            ]);
        });

        sheetData.push([]);
    });

    const exportToExcel = () => {
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...sheetData]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
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

export const  PDFExport = ({ sheetData }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    const totalPages = sheetData.length;

    sheetData.forEach((user, index) => {
      if (index > 0) doc.addPage();

      // Judul
      doc.setFontSize(14);
      doc.text("Laporan Absensi", 14, 15);
      doc.setFontSize(12);
      doc.text(`Nama: ${user.name}`, 14, 25);   

      // Header & Body tabel
      const headers = [["Hari", "Tanggal", "Jam", "Tipe", "Status"]];
      const body = user.records.map(r => [
        r.hari,
        r.tanggal,
        r.jam,
        r.tipe,
        r.status,
      ]);

      autoTable(doc, {
        head: headers,
        body: body,
        startY: 35,
        theme: "striped",
        headStyles: { fillColor: [22, 160, 133] },
      });

      // Footer halaman
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.text(
        `Halaman ${index + 1} dari ${totalPages}`,
        doc.internal.pageSize.width - 50,
        pageHeight - 10
      );
    });

    doc.save("laporan-absensi.pdf");
  };

  return (
    <Button 
      variant='contained' 
      size='small' 
      onClick={exportToPDF}
      startIcon={<PictureAsPdfIcon />}
      sx={{
        backgroundColor: red[400],
        '&:hover': {
          backgroundColor: red[600]
        },
        fontSize: '11px',
        '& .MuiButton-startIcon': {
          fontSize: '16px', // ukuran icon
        },
      }}
      >
      PDF
      </Button>
  )
}