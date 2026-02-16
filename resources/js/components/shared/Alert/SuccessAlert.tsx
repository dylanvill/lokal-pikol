import BaseAlert, { type BaseAlertProps } from './BaseAlert';

function SuccessAlert({ title, description }: Omit<BaseAlertProps, 'status'>) {
    return <BaseAlert status="success" title={title} description={description} />;
}

export default SuccessAlert;
