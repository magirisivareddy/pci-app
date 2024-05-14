import React from 'react';
import { Avatar, Box, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import EmailIcon from '@mui/icons-material/Email';

import "./InspectorCell.css"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setDeletInspectionModal, setSelectedVenueInspector } from '@/redux/features/VenuesSlice';

interface Inspector {
    inspectorId?: number;
    inspector: string;
    inspectorType: number; // Added inspectorType to interface
    email: string; // Added email to interface
}

interface InspectorCellProps {
    inspectorDetails: Inspector[];
    onAdd: () => void;
}

const InspectorCell: React.FC<InspectorCellProps> = ({ inspectorDetails, onAdd }) => {
    const dispatch = useAppDispatch();
    const {  employeeInfo} = useAppSelector((state: { common: any; }) => state.common)
    const isViewList = ["BackupInspector","MainInspector","Audit"]

    // Check if MI is present
    const hasMainInspector = inspectorDetails.some((inspector: Inspector) => inspector.inspectorType === 1);

    // Check if there are other inspectors (BI or GI)
    const hasOtherInspectors = inspectorDetails.some((inspector: Inspector) => inspector.inspectorType !== 1);

    // Function to handle inspector deletion
    const onDelete = (inspector: Inspector) => {
 
        dispatch(setDeletInspectionModal(true));
        dispatch(setSelectedVenueInspector(inspector));
    };

    return (
        <div className="inspector-cell-container">
            <div className="scroll-container">
                {hasMainInspector ? (
                    inspectorDetails.map((inspector: Inspector, index: number) => (
                        <Box key={inspector.inspectorId} sx={{ display: "flex", gap: "5px", textWrap: "nowrap" }}>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                                <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} onClick={() => onDelete(inspector)} color='warning' />
                                <Avatar
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        fontSize: "12px",
                                        backgroundColor: inspector.inspectorType === 1 ? "green" : (inspector.inspectorType === 2 ? "#bc48bc" : "#4c74b5"),
                                    }}
                                >
                                    {inspector.inspectorType === 1 ? "MI" : (inspector.inspectorType === 2 ? "GI" : "BI")}
                                </Avatar>
                                <span>{inspector.inspector}</span>
                                {inspector.email === "0" && (
                                    <span>
                                        <EmailIcon sx={{
                                            width: "0.8rem",
                                            height: "0.8rem",
                                            marginTop: "3px",
                                            marginRight: "8px"
                                        }} color={'error'} />
                                    </span>
                                )}
                            </Box>
                        </Box>
                    ))
                ) : (
                    hasOtherInspectors ? (
                        <>
                            <Avatar
                                sx={{
                                    width: 20,
                                    height: 20,
                                    fontSize: "12px",
                                    backgroundColor: "green",
                                }}
                            >MI</Avatar>
                            <span style={{ textWrap: "nowrap", color: "red" }}> Missing main inspector</span>

                            {
                                inspectorDetails.map((inspector: Inspector, index: number) => (
                                    <Box key={inspector.inspectorId} sx={{ display: "flex", gap: "5px", textWrap: "nowrap" }}>
                                        <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} onClick={() => onDelete(inspector)} color='warning' />
                                        <Avatar
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                fontSize: "12px",
                                                backgroundColor: inspector.inspectorType === 1 ? "green" : (inspector.inspectorType === 2 ? "#bc48bc" : "#4c74b5"),
                                            }}
                                        >
                                            {inspector.inspectorType === 2 ? "GI" : "BI"}
                                        </Avatar>
                                        <span>
                                            {inspector.inspector}
                                        </span>

                                    </Box>
                                ))
                            }

                        </>
                    ) : (
                        <Box sx={{ display: "flex", gap: "5px" }}>
                            <Avatar
                                sx={{
                                    width: 20,
                                    height: 20,
                                    fontSize: "12px",
                                    backgroundColor: "green",
                                }}

                            >MI</Avatar>
                            <span style={{ textWrap: "nowrap", color: "red" }}> Missing main inspector</span></Box>
                    )
                )}
            </div>
            <Box className='add-inspector-btn'>
            {!isViewList.includes(employeeInfo?.role) ?
                <Tooltip color='primary' title="Add Inspector...">
                    <AddCircleOutlineIcon sx={{ cursor: "pointer" }} color='primary' onClick={() => onAdd()} />
                </Tooltip>:null}
            </Box>
        </div>
    );
};

export default InspectorCell;
