import React from 'react';
import { Tooltip as ToolTipNext } from '@nextui-org/react';

const ToolTipText = ({ hoverable_title, text }) => {
  return (
    <ToolTipNext
      className="font-normal bg-secondary text-primary rounded-md text-md px-2 border-primary border"
      content={text}
    >
      <h1 className="text-xl font-semibold text-primary p-4 border-bottom-color">
        {hoverable_title}
      </h1>
    </ToolTipNext>
  );
};

export default ToolTipText;