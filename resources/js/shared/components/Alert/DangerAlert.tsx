import BaseAlert, { type BaseAlertProps } from './BaseAlert';

function DangerAlert({ title, description }: Omit<BaseAlertProps, 'status'>) {
    return <BaseAlert status="error" title={title} description={description} />;
}

export default DangerAlert;
