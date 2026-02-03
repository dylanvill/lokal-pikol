import { LuHouse, LuSun } from 'react-icons/lu';

export const courtTypeIconParser = (type: 'covered' | 'outdoor') => {
    return type === 'covered' ? LuHouse : LuSun;
};

export default courtTypeIconParser;
