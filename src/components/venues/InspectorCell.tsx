import React from 'react';
import { Avatar, Box, Button, Chip, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

import "./InspectorCell.css"
import { useAppDispatch } from '@/redux/hooks';
import { setDeletInspectionModal, setSelectedVenueInspector } from '@/redux/features/VenuesSlice';

interface Inspector {
    inspectorId?: number;
    inspector: string;
}

interface InspectorCellProps {
    inspectorDetails: any;
    onAdd: () => void;
    // onDelete: (inspector: any) => void;
}

const InspectorCell: React.FC<InspectorCellProps> = ({ inspectorDetails, onAdd }) => {
    const dispatch= useAppDispatch()
    const hasMainInspector = inspectorDetails.some((inspector: any) => inspector.inspector !== "");
    const onDelete = (inspector: any) => {
        dispatch(setDeletInspectionModal(true))
        dispatch(setSelectedVenueInspector(inspector))


        console.log("inspector",inspector)
    }
    return (
        <div className="inspector-cell-container">
            <div className="scroll-container">
                {hasMainInspector ? (
                    inspectorDetails.map((inspector: any, index: any) => (
                        <Box key={inspector.inspectorId} sx={{ display: "flex", gap: "5px", textWrap: "nowrap" }}>
                            {inspector.inspector ? (
                                <Box sx={{ display: "flex", gap: "5px" }}>
                                    <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} onClick={() =>  onDelete(inspector)} color='warning' />
                                    <Avatar
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            fontSize: "12px",
                                            backgroundColor: inspector.inspectorType === 1 ? "green" : (inspector.type === 2 ? "#bc48bc" : "#4c74b5"),
                                        }}
                                    >
                                        {inspector.inspectorType === 1 ? "MI" : (inspector.type === 2 ? "GI" : "BI")}
                                    </Avatar>
                                    <span>{inspector.inspector}</span>
                                </Box>
                            ) : (
                                <Box sx={{ color: "red" }}>Missing main inspector</Box>
                            )}
                        </Box>
                    ))
                ) : (
                    <Box sx={{ color: "#9c4040" }}>Missing main inspector</Box>
                )}
            </div>
            <Box className='add-inspector-btn'>
                <Tooltip color='primary' title="Add Inspector...">
                    <AddCircleOutlineIcon sx={{ cursor: "pointer" }} color='primary' onClick={() => onAdd()} />
                </Tooltip>
            </Box>
        </div>
    );
};

export default InspectorCell;
