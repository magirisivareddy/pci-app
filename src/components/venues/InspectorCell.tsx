import React from 'react';
import { Button, Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
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
                        <Chip
                            key={index}
                            label={inspector.name}
                            onDelete={() => inspector.id ? onDelete(inspector.id) : undefined}
                            deleteIcon={<DeleteIcon />}
                        />
                    ))
                )}
            </div>
            <Button
                sx={{
                    color: "#000",
                    border: "1px solid"
                }}
                size='small'
                className="add-inspector-btn"
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => onAdd({ name: "New Inspector" })}
            >
                Add Inspector...
            </Button>
        </div>
    );
};

export default InspectorCell;
