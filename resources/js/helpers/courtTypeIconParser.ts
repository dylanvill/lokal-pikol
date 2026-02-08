import { LuHouse, LuSun } from 'react-icons/lu';

export const courtTypeIconParser = (covered: boolean) => {
    return covered ? LuHouse : LuSun;
};

export default courtTypeIconParser;
