import React, { Fragment } from 'react';
import DateRangePicker from '@/app/components/ui/Calenders/DateRangePicker';

const FilterByDate = ({
    label
}) => {


    return (
        <Fragment>
            <label className="block text-sm font-medium text-accent mb-1 mt-4">
                {label}
            </label>
            <DateRangePicker />
        </Fragment>
    )
}

export default FilterByDate;