import React from 'react';
import { DataGrid, DataGridProps, gridClasses } from '@mui/x-data-grid';
import { styled } from '@mui/material';
import { theme } from '../../../theme';
import Checkbox from '../../atoms/Checkbox';

export interface TableProps extends DataGridProps {
    width: string;
}

const StyledDataGrid = styled(DataGrid)(({ width }: { width: string }) => ({
    width: width,
    border: 'none',
    '--unstable_DataGrid-overlayBackground': 'none',
    '.MuiDataGrid-columnHeaderTitle': {
        fontSize: theme.typography.body2.fontSize,
        lineHeight: theme.typography.body2.lineHeight,
        fontWeight: 600,
        fontFamily: theme.typography.body2.fontFamily,
        color: theme.palette.text.disabled
    },
    [`& .${gridClasses.row}`]: {
        '&.Mui-selected': {
            backgroundColor: theme.palette.primary[600],
            '&:hover, &.Mui-hovered': {
                backgroundColor: theme.palette.primary[600]
            }
        }
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus':
        {
            outline: 'none',
            border: 'none',
            borderBottom: 'none'
        },
    '& .MuiDataGrid-columnHeaderCheckbox': {
        padding: '12px',
        width: '44px',
        height: '44px',
        '& .MuiDataGrid-columnHeaderDraggableContainer': {
            width: 'auto'
        }
    },
    '&.MuiDataGrid-cell': {
        border: 'none',
        padding: '12px 20px',
        backgroundColor: theme.palette.primary[600],
        '&:hover': {
            cursor: 'pointer'
        }
    },
    '.MuiDataGrid-row': {
        height: '300px', // Adjust the height as needed
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell': {
        borderBottom: 'none'
    },
    '.MuiDataGrid-columnHeaders': {
        borderBottom: 'none',
        backgroundColor: theme.palette.grey[100]
    },
    '.MuiDataGrid-columnSeparator': {
        display: 'none'
    },
    '& .MuiDataGrid-columnHeaderCheckbox:focus-within': {
        outline: 'none'
    },
    '& .MuiDataGrid-cellCheckbox.MuiDataGrid-cell:focus-within': {
        outline: 'none'
    },
    '&.MuiDataGrid-root': {
        border: 'none'
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
        background: 'none'
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
        background: 'none'
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
        background: 'none'
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
        background: 'none'
    },
    '& .MuiDataGrid-overlay ': {
        fontSize: "0px"
    }
}));

export const Table = ({ width, ...rest }: TableProps) => {
    return (
        <StyledDataGrid
            width={width}
            rowHeight={65}
            {...rest}
            hideFooter
            hideFooterPagination
            disableColumnMenu
            disableVirtualization
            autoHeight
            slots={{
                baseCheckbox: Checkbox
            }}
        />
    );
};
