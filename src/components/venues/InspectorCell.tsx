import React from 'react';
import { Box, Button, Chip, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import "./InspectorCell.css"

interface Inspector {
    id?: number;
    name: string;
}

interface InspectorCellProps {
    inspectors: Inspector[];
    onAdd: (inspector: Inspector) => void;
    onDelete: (inspectorId: number) => void;
}

const InspectorCell: React.FC<InspectorCellProps> = ({ inspectors, onAdd, onDelete }) => {
    return (
        <div className="inspector-cell-container">
            <div className="scroll-container">
                {inspectors.length === 0 ? (
                    <span>No Inspector</span>
                ) : (
                    inspectors.map((inspector: any, index: any) => (
                        // <Chip
                        //     key={index}
                        //     // color='default'
                        //     sx={{
                        //         // background:"#c8ebef",
                        //         fontSize:" 0.75rem",
                        //         height:"24px"
                        //     }}
                        //     label={inspector.name}
                        //     onDelete={() => inspector.id ? onDelete(inspector.id) : undefined}
                        //     deleteIcon={<RemoveCircleRoundedIcon color='warning' />}
                        // />
                        <Box sx={{display:"flex", gap:"5px", textWrap:"nowrap"}}>
                        <RemoveCircleRoundedIcon sx={{cursor:"pointer"}} onClick={() => inspector.id ? onDelete(inspector.id) : undefined} color='warning' /> {inspector.name}
                        </Box>
                        
                    ))
                )}
            </div>
               <Box className='add-inspector-btn'>
               <Tooltip color='primary' title="Add Inspector...">
               <AddCircleOutlineIcon sx={{cursor:"pointer"}} color='primary' onClick={() => onAdd({ name: "New Inspector" })} />
               </Tooltip>
               </Box>
           
        </div>
    );
};

export default InspectorCell;
