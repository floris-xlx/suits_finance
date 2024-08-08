import React, { Fragment } from 'react';
import OrganizationTab from '@/app/components/ui/Tabs/OrganizationTab';

const ChangeOrganization = () => {
    return (
        <Fragment>
            <OrganizationTab
                organizationNames={['Suits Finance', 'Diamant Capital', 'Trades By Rob']}
            />
        </Fragment>
    )
}

export default ChangeOrganization;