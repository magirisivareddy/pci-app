import React from 'react';

const Information = () => {
  return (
    <div className="info">
      <section>
        <strong>Inspections</strong> - Every Sunday to Saturday, Weekly PCI inspections of devices are conducted by those
        assigned as inspectors, usually a manager of the specific venue. These are submitted through a
        paperless report in SharePoint via a link that only the inspectors have access to.
      </section>

      <section>
        <strong>Devices to Be Inspected</strong> - In order to be PCI compliant, the following data about each credit
        card-related device in use by KTEA must be on record in Sage Fixed Assets:
        <ul>
          <li>Common Asset name - this is what the device is (POS System, credit card swiper, etc.).</li>
          <li>Manufacturer - who made the device.</li>
          <li>Vendor - from whom KTEA purchased the device.</li>
          <li>Model # - as it appears on the device.</li>
          <li>Serial # - as it appears on the device.</li>
          <li>Asset # - this is a KTEA in-house tracking number, affixed to the device. This is not required for
            any devices that KTEA does not own.</li>
          <li>Venue - where the device is being used (Epic, Hotel Reservations, etc.).</li>
          <li>Location - a brief description of where in a venue the device is located.</li>
          <li>Terminal ID (optional) - this is used for Agilysys POS systems.</li>
          <li>Profile ID (optional) - this is used for Agilysys POS systems.</li>
        </ul>
      </section>

      <section>
        <strong>Venues</strong> - Venues can be added / updated / deleted by Admins only.
      </section>

      <section>
        <strong>Devices</strong> - Devices can be added / updated / deleted by IT team members only (see IT DeskTop).
      </section>

      <section>
        <strong>Labeling</strong> - All devices must have a model number and serial number on the device. If not,
        either the label or the device must be replaced.
      </section>

      <section>
        <strong>Notifications</strong> - Automatic email notifications are sent to inspectors and admins as follows:
        <ul>
          <li><u>Every Sunday @ 1:00 AM:</u> A check is made to verify that all PCI Inspection Reports for all listed
            venues and their devices have been submitted. If any reports had not been submitted, a notice is sent to the
            Admins informing them of this. A notice is also sent to the Main Inspector who was responsible to submit the
            report, as well as to the Group Inspector (if there is one).</li>
          <li><u>Every Thursday, Friday, Saturday @ 1:00 AM:</u> Deadlines - Email notifications are sent to Main
            Inspectors who have not yet submitted a PCI Inspection Report, reminding them of the upcoming deadlines.</li>
        </ul>
      </section>
    </div>
  );
}

export default Information;
