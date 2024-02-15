import React from 'react'

const WhatToInspectModal = () => {
    return (
        <div> <p><b>PCI Inspection Reports:</b></p>
            <p>* Reports are to be submitted <b>weekly</b> (once per week, Sunday - Saturday), and are due no later than Saturday before midnight.</p>
            <p>* The assigned Main Inspector is responsible to submit the weekly report for a given venue.</p>
            <p>* The assigned Backup Inspector for a given venue is to submit the report is the Main Inspector is not able to do so.</p>
            <p>* If there is a Group Inspector for a given venue, they may also submit the report is needed.</p>
            <p><b>Types of Devices:</b> - Most types of credit card devices to be inspected fall into one of three categories:</p>
            <p>* All-in-one POS System - This is a POS system where the credit card reader is built into the monitor, such as in Masselow's and Epic.</p>
            <p>* Component POS System - This is a POS system where the credit card reader is a separate component connected by a cable, such as a USB Magtek swiper or a credit card terminal. Hotel Reservations is an example of this. In this case, there are two "devices" that must be inspected separately: the POS system and the credit card reader.</p>
            <p>* Credit Card Terminal - This is a stand-alone credit card device that is not connected to a POS system. Accounting has two such devices.</p>
            <br /> <p><b>What to Inspect:</b></p>
            <p>* Inspect all input ports, making sure that they have not been tampered with and no extra devices have been added.</p>
            <p>* Inspect the credit card reader, making sure that has not been tampered with and that it has not been replaced a different device.</p>
            <br /> <p> <b>How to Complete Report:</b></p>
            <p>* All devices for a given venue must be inspected in order to submit the report.</p>
            <p>* Pass - select "Pass" if the device passed inspection. No notes required.</p>
            <p>* Failed - select "Fail" if for any reason the device does not pass inspection. A brief note as to why is required.</p>
            <p>* Questionable - select "Questionable" if for any reason you are not sure if the device can pass inspection. A brief note as to why is required.</p>
            <p><b>What Happens Next:</b></p>
            <p>If for any reason a device fails or is questionable, your report will greatly assist in getting the issue addressed as quickly as possible by those responsible to fix it. Once fixed, the resolution as to how it was addressed will be entered by a PCI Inspection Report Admin, thus closing the issue.</p>
        </div>
    )
}

export default WhatToInspectModal