

import * as React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, AccordionDetails,
    Typography, Accordion, AccordionSummary, Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ScheduleHover from './ScheduleHover';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

function createData(number, monday, tuesday, wednesday, thursday, friday) {
    return { number, monday, tuesday, wednesday, thursday, friday };
}

const mix = (title, tooltip) => {
    return <ScheduleHover title={title} tooltip={tooltip} />
}

const rows = [
    createData('1', mix('SHDC', 'Sáng 7:00 - 7:45'), 'LTVC', 'Tập làm văn', 'Thể dục', 'Khoa học'),
    createData('2', 'Toán', 'Mĩ thuật', 'Toán', 'Thủ công', 'Mĩ thuật'),
    createData('3', 'Tập đọc', 'Tập đọc', 'Tập đọc', 'Khoa học', 'Khoa học'),
    createData('4', 'TN&XH', 'Toán', 'Toán', 'Toán', 'Địa lý'),
    createData('5', 'Tiếng Anh', '', 'Thủ công', 'Âm nhạc', 'Lịch sử'),
    createData('', '', '', '', '', ''),
    createData('1', 'PĐ Toán', 'PĐ. Tiếng việt', 'Tập đọc', 'Chính tả', 'LTVC'),
    createData('2', 'Toán', 'Toán', '', 'Tiếng Việt', 'HDNGLL'),
    createData('3', '', '', '', 'Thể dục'),
    createData('4', '', '', '', '', 'Thủ công'),
    createData('5', '', '', '', '', 'Mĩ thuật'),
];

const Schedule = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    return (<>
        <Box sx={{
            borderRadius: `${customization.borderRadius}px`,
            backgroundColor: theme.palette.background.paper,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.primary[200] + 75
        }}>
            <Accordion sx={{ background: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Thời khóa biểu</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table" size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tiết</TableCell>
                                    <TableCell align="center" flex={1}>Thứ hai</TableCell>
                                    <TableCell align="center" flex={1}>Thứ ba</TableCell>
                                    <TableCell align="center" flex={1}>Thứ tư</TableCell>
                                    <TableCell align="center" flex={1}>Thứ năm</TableCell>
                                    <TableCell align="center" flex={1}>Thứ sáu</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.number}</TableCell>
                                        <TableCell align="center">{row.monday}</TableCell>
                                        <TableCell align="center">{row.tuesday}</TableCell>
                                        <TableCell align="center">{row.wednesday}</TableCell>
                                        <TableCell align="center">{row.thursday}</TableCell>
                                        <TableCell align="center">{row.friday}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Box>
    </>
    )
}

export default Schedule;