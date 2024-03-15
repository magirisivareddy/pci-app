import React from 'react';
import { Button, Chip, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import "./DeleteVenue.css"
import {  setAddVenuToInspectorModal, setDeletedVenuId, setSelectedGroupInspectors, setdeleteVenuModal } from '@/redux/features/GroupInspectorsSlice';
import { useAppDispatch } from '@/redux/hooks';


const AddAndDeleteVenue = ({ row }: any) => {
    console.log("row", row)
    const venues: any[] = row?.venueDetails ?? []
    const dispatch = useAppDispatch();

    const addVenueToInspector = (event: any) => {
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setAddVenuToInspectorModal(true))
    }
    const onDeleteVenue = async(venue: any) => {
        dispatch(setDeletedVenuId( venue.venueId))
        dispatch(setSelectedGroupInspectors(row))
        dispatch(setdeleteVenuModal(true))
   
     
    }
    return (
        <div className="venue-cell-container">
            <div className="scroll-container">
                {venues?.length === 0 ? (
                    <span>No Inspector</span>
                ) : (
                    venues?.map((venue: any, index: any) => (
                        <>
                            <RemoveCircleRoundedIcon sx={{ cursor: "pointer" }} color='warning' onClick={() => onDeleteVenue(venue)} /> {venue.venueName}</>

                    ))
                )}
            </div>

            <Tooltip color='primary' title="Add Venue">
                <IconButton onClick={addVenueToInspector} sx={{ padding: 0 }}>
                    <AddCircleIcon color='primary' fontSize='medium' />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default AddAndDeleteVenue