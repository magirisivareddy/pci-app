import React from 'react';
import { Avatar, Box, Button, Chip, Tooltip } from '@mui/material';
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
                    <Box sx={{ color: "#9c4040" }}>Missing main inspector</Box>
                ) : (
                    inspectors.map((inspector: any, index: any) => (
                        <Box key={inspector.name} sx={{ display: "flex", gap: "5px", textWrap: "nowrap" }}>
                            <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} onClick={() => inspector.id ? onDelete(inspector.id) : undefined} color='warning' />
                            {inspector.name ? <Box sx={{ display: "flex", gap: "5px", }}>

                                <Avatar
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        fontSize: "12px",
                                        backgroundColor: inspector.type === "MI" ? "green" : (inspector.type === "GI" ? "#bc48bc" : "#4c74b5"), // Set your desired background color here
                                    }}
                                >
                                    {inspector.type === "MI" ? "MI" : (inspector.type === "GI" ? "GI" : "BI")}
                                </Avatar>
                                <span>{inspector.name}

                                </span>
                            </Box> : <Box sx={{ color: "red" }}>Missing main inspector</Box>}
                        </Box>

                    ))
                )}
            </div>
            <Box className='add-inspector-btn'>
                <Tooltip color='primary' title="Add Inspector...">
                    <AddCircleOutlineIcon sx={{ cursor: "pointer" }} color='primary' onClick={() => onAdd({ name: "New Inspector" })} />
                </Tooltip>
            </Box>

        </div>
    );
};

export default InspectorCell;
