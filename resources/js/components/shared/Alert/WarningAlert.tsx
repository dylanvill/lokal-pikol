import BaseAlert, { type BaseAlertProps } from './BaseAlert';

function WarningAlert({ title, description }: Omit<BaseAlertProps, 'status'>) {
    return <BaseAlert status="warning" title={title} description={description} />;
}

export default WarningAlert;
