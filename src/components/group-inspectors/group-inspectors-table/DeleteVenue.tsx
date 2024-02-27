import React from 'react';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import "./DeleteVenue.css"
import { setInspectorModal, setSelectedGroupInspectors, setdeleteVenuModal } from '@/redux/features/GroupInspectorsSlice';
import { useAppDispatch } from '@/redux/hooks';



const DeleteVenue = ({ row }: any) => {
    const dispatch = useAppDispatch();
    const { venues } = row
    const addInspector = (event: any) => {
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setInspectorModal(true))
    }
    const onDeleteVenue = (venue: any) => {
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setdeleteVenuModal(true))
    }
    return (
        <div className="venue-cell-container">
            <div className="scroll-container">
                {venues.length === 0 ? (
                    <span>No Inspector</span>
                ) : (
                    venues.map((venue: any, index: any) => (
                        <>
                            <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} color='warning' onClick={() => onDeleteVenue(venue)} /> {venue.name}</>

                    ))
                )}
            </div>

            <Tooltip color='primary' title="Add Venue">
                <IconButton onClick={addInspector} sx={{ padding: 0 }}>
                    <AddCircleIcon color='primary' fontSize='medium' />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default DeleteVenue