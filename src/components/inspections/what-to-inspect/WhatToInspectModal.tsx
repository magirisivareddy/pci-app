import React from 'react';

const WhatToInspectModal = () => {
  return (
    <div>
      <section>
        <p><strong>PCI Inspection Reports:</strong></p>
        <ul>
          <li>Reports are to be submitted <strong>weekly</strong> (once per week, Sunday - Saturday), and are due no later than Saturday before midnight.</li>
          <li>The assigned Main Inspector is responsible to submit the weekly report for a given venue.</li>
          <li>The assigned Backup Inspector for a given venue is to submit the report if the Main Inspector is not able to do so.</li>
          <li>If there is a Group Inspector for a given venue, they may also submit the report if needed.</li>
        </ul>
      </section>

      <section>
        <p><strong>Types of Devices:</strong> - Most types of credit card devices to be inspected fall into one of three categories:</p>
        <ul>
          <li>All-in-one POS System - This is a POS system where the credit card reader is built into the monitor, such as in Masselow&apos;s and Epic.</li>
          <li>Component POS System - This is a POS system where the credit card reader is a separate component connected by a cable, such as a USB Magtek swiper or a credit card terminal. Hotel Reservations is an example of this. In this case, there are two &quot;devices&quot; that must be inspected separately: the POS system and the credit card reader.</li>
          <li>Credit Card Terminal - This is a stand-alone credit card device that is not connected to a POS system. Accounting has two such devices.</li>
        </ul>
      </section>

      <section>
        <p><strong>What to Inspect:</strong></p>
        <ul>
          <li>Inspect all input ports, making sure that they have not been tampered with and no extra devices have been added.</li>
          <li>Inspect the credit card reader, making sure that it has not been tampered with and that it has not been replaced with a different device.</li>
        </ul>
      </section>

      <section>
        <p><strong>How to Complete Report:</strong></p>
        <ul>
          <li>All devices for a given venue must be inspected to submit the report.</li>
          <li>Pass - select &quot;Pass&quot; if the device passed inspection. No notes required.</li>
          <li>Failed - select &quot;Fail&quot; if for any reason the device does not pass inspection. A brief note as to why is required.</li>
          <li>Questionable - select &quot;Questionable&quot; if for any reason you are not sure if the device can pass inspection. A brief note as to why is required.</li>
        </ul>
      </section>

      <section>
        <p><strong>What Happens Next:</strong></p>
        <p>If for any reason a device fails or is questionable, your report will greatly assist in getting the issue addressed as quickly as possible by those responsible to fix it. Once fixed, the resolution as to how it was addressed will be entered by a PCI Inspection Report Admin, thus closing the issue.</p>
      </section>
    </div>
  );
}

export default WhatToInspectModal;
