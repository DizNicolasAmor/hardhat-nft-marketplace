import React, { FC } from 'react';

interface IErrorProps {
  errorMessage: string;
}

const Error: FC<IErrorProps> = ({ errorMessage }) => (
  <div
    className="text-center p-3 text-danger"
    aria-live="assertive"
    aria-atomic="true"
  >
    {errorMessage}
  </div>
);
export default Error;
