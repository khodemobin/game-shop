import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

interface KeySpec {
  label: string;
  value: string;
}

interface KeySpecsProps {
  specs: KeySpec[];
}

export default function KeySpecs({ specs }: KeySpecsProps) {
  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table>
        <TableBody>
          {specs.map((spec) => (
            <TableRow key={spec.label}>
              <TableCell component='th' scope='row' sx={{ fontWeight: 500 }}>
                {spec.label}
              </TableCell>
              <TableCell>{spec.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
