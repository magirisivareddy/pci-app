

import React from 'react'
import CustomTable from '@/components/common/table/Table'
import InspectorAdminDeleteCell from './InspectorAdminDeleteCell';
import InspectorAdminLevelCell from './InspectorAdminLevelCell';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/common/modal/Modal';
import { setinspectorAdminDeleteModal } from '@/redux/features/InspectorAdminSlice';
import DeleteAdmiin from '../delete-admiin/DeleteAdmiin';

const headers = [
    {
        id: "name", label: "Name", customRender: (_: any, row: any) => {
            return <>{row.lastName} {row.firstName} </>
        }
    },
    { id: "badgeNo", label: "Employee Badge" },
    { id: "jobTitle", label: "Job Title Department" },
    { id: "phoneNumber", label: "Phone" },
    { id: "email", label: "email" },
    {
        id: "adminLevel", label: "Level", customRender: (_: any, row: any) => (
            <InspectorAdminLevelCell row={row} />
        )
    },
    {
        id: "actions", label: "Actions", customRender: (_: any, row: any) => (
            <InspectorAdminDeleteCell row={row} />
        )
    },
]

const InspectorAdminTable = () => {
    const dispatch = useAppDispatch()
    const { adminData,error,status } = useAppSelector(state => state.inspectorAdmin)
    const { isinspectorAdminDeleteModal } = useAppSelector(state => state.inspectorAdmin.inspectorAdminInfo)
    const handleClose = () => {
        dispatch(setinspectorAdminDeleteModal(false))
    }
    return (
        <>
            <CustomTable data={adminData} headers={headers} isloading={status==="loading"} />
            <Modal
                title={`Delete Admin`}
                open={isinspectorAdminDeleteModal}
                scroll={"body"}
                handleClose={handleClose}
                contentComponent={DeleteAdmiin}
                maxWidth='sm'
                fullWidth={true}

            />
        </>
    )
}

export default InspectorAdminTable