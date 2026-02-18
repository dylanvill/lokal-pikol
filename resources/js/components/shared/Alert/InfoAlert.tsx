import BaseAlert, { type BaseAlertProps } from './BaseAlert';

function InfoAlert({ title, description }: Omit<BaseAlertProps, 'status'>) {
    return <BaseAlert status="info" title={title} description={description} />;
}

export default InfoAlert;
