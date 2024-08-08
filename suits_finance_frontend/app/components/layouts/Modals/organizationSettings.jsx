import React, { Fragment } from 'react';
import SwitchInBlock from '@/app/components/ui/Switches/SwitchInBlock';

const OrganizationSettings = () => {
    return (
        <Fragment>
            <SwitchInBlock
                label={'Enable auto-approval'}
                subText={'Automatically approves the trades without needing manual approval'}
                supabaseKey={'auto_approval'}
                cacheKey={'autoApproval'}
                organizationData={true}
            />
        </Fragment>
    )
}

export default OrganizationSettings;