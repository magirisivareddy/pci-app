import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import Link from 'next/link';

const SideBarTabs = () => {
    return (
        <Sidebar transitionDuration={1000} backgroundColor={"#f1fafb"} style={{height:"100%"}} >
            <Menu >
                <SubMenu
                    defaultOpen
                    label="Inspections"
                    component={<Link href={'/'} />}
                >
                    <MenuItem> Reports</MenuItem>

                </SubMenu>
            </Menu>
            <Menu>
                <MenuItem component={<Link href={'/venues'} />}> Venues</MenuItem>
            </Menu>
            <Menu>
                <MenuItem component={<Link href={'/admins'} />}> Admins</MenuItem>
            </Menu>
            <Menu>
                <MenuItem component={<Link href={'/groupinspectors'} />}> Group Inspectors</MenuItem>
            </Menu>
            <Menu>
                <MenuItem component={<Link href={'/devices'} />}> Devices</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideBarTabs